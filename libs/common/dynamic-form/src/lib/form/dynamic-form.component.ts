import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  ViewEncapsulation,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { expandFromCenter } from '@uqt/common/animations';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicFormErrorsService } from '../form-errors/form-errors.service';
import {
  FormGroupTypes,
  FormArrayTypes,
  IDynamicFormConfig,
  TFormStructure,
  IFormGroupArray,
  IFormFieldArray,
} from '../dynamic-form.interface';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { PrivateDynamicFormFacade } from '../+state/private-dynamic-form.facade';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [expandFromCenter],
})
export class DynamicFormComponent implements OnChanges, OnDestroy {
  @Input()
  set formName(name: string | undefined) {
    if (name) this._name = name;
  }
  private _name: string;

  public form: FormGroup | undefined;
  private unsubscribe = new Subject<void>();

  config: IDynamicFormConfig;
  formIdx$: Observable<number>;
  structure$: Observable<TFormStructure>;
  validators$: Observable<ValidatorFn[]>;

  constructor(
    private service: DynamicFormService,
    private errorsService: DynamicFormErrorsService,
    private facade: DynamicFormFacade,
    private pFacade: PrivateDynamicFormFacade,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    if (!this._name) {
      throw new Error('Form name must bes set');
    }
    // When the form name changes, unsubscribe from all and init the new form
    this.unsubscribe.next();
    this.initDynamicForm(this._name);
  }

  initDynamicForm(name: string) {
    // Because of all the template references to the 'config' option,
    // it is set as property rather than observable. This means the template
    // does not need to use the async pipe all the time (and all subsequent subscriptions).
    // This is more performent. However change detection will have to be triggered manually
    this.pFacade
      .selectConfig(name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((config) => {
        if (!config) throw new Error(`${name} form has not been initialized.`);
        this.config = config;
        if (this.form) {
          config.enabled ? this.form.enable() : this.form.disable();
        }
        this.cd.markForCheck();
      });

    // From this point on we can guarantee the form is configured
    this.structure$ = this.pFacade.selectStructure(name) as Observable<
      TFormStructure
    >;
    this.formIdx$ = this.pFacade.selectIndex(name) as Observable<number>;
    this.validators$ = this.pFacade.selectValidators(name) as Observable<
      ValidatorFn[]
    >;

    combineLatest([this.structure$, this.validators$])
      .pipe(
        map(([structure, formValidators]) => {
          // Build the form
          const form = this.service.formBuilder(structure);
          // Add the form validators
          form.setValidators(formValidators);

          if (this.config && !this.config.enabled) {
            form.disable();
          }

          // Set the internal form property with the new form
          this.form = form;

          return form;
        }),
        // Switch to the observable of the change in form values
        switchMap((form) =>
          form.valueChanges.pipe(
            // Wait 100ms before updating the store
            // NOTE: This needs to be relatively fast
            // Think of pushing enter after entering a well know password, store may have not
            // updated in time
            debounceTime(100)
          )
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe((data) => {
        // Update the store
        this.pFacade.updateDataState(name, data);
      });

    // The set data method does not update the store, it resets the form with the data
    // When the form resets, it will emit a value changed event and subsequently will update the store
    this.pFacade
      .setData$(name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (this.form) {
          this.form.reset(data);
        }
      });

    this.pFacade
      .submitTriggers(name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.onSubmit(this.form);
      });
  }

  onSubmit(form: FormGroup | undefined) {
    if (form) {
      if (form.valid) {
        this.pFacade.clearErrors(this._name as string);
        this.pFacade.internalSubmit(this._name as string, form.value);
      } else {
        // collect all form errors
        const errors = this.service.getAllFormErrors(form);
        this.pFacade.setErrors(this._name as string, errors);
        this.errorsService.createFormErrors(this._name as string);
      }
    }
  }

  getFormGroup(formGroup: FormGroup, name: string): FormGroup {
    return formGroup.get(name) as FormGroup;
  }

  getArrayGroup(formGroup: FormGroup, name: string): FormArray {
    return formGroup.get(name) as FormArray;
  }

  getArrayGroupControls(formGroup: FormGroup, groupName: string) {
    return (formGroup.get(groupName) as FormArray).controls;
  }

  getFormArrayFormGroups(formGroup: FormGroup, name: string): FormGroup[] {
    return (formGroup.get(name) as FormArray).controls as FormGroup[];
  }

  isGroupFields(type: FormGroupTypes): boolean {
    return Boolean(type === FormGroupTypes.Group);
  }

  isFieldArray(type: FormArrayTypes): boolean {
    return Boolean(type === FormArrayTypes.Field);
  }

  nextSection() {
    if (this._name) {
      this.facade.nextSection(this._name);
    }
  }

  backASection() {
    if (this._name) {
      this.facade.backASection(this._name);
    }
  }

  get topLevelContext() {
    return { formGroup: this.form };
  }

  createTemplateOutletContext(formGroup: FormGroup, structure: any) {
    return { formGroup, structure };
  }

  removeArrayField(formGroup: FormGroup, i: number, arrayName: string) {
    const arrayGroup = this.getArrayGroup(formGroup, arrayName);
    arrayGroup.removeAt(i);
  }

  addGroupToFormArray(formGroup: FormGroup, structure: IFormGroupArray) {
    const newGroup = this.service.creatFormGroupOfArrayFields(structure.fields);
    const arrayGroup = this.getArrayGroup(formGroup, structure.groupName);
    arrayGroup.push(newGroup);
  }

  addFieldToFormArray(formGroup: FormGroup, structure: IFormFieldArray) {
    const newGroup = this.service.createControl(structure.field);
    const arrayGroup = this.getArrayGroup(formGroup, structure.groupName);
    arrayGroup.push(newGroup);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
