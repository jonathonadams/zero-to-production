import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  ViewEncapsulation,
  OnChanges
} from '@angular/core';
import { FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  map,
  tap,
  debounceTime,
  switchMap,
  withLatestFrom,
  takeUntil
} from 'rxjs/operators';
import { expandFromCenter } from '@uqt/common/animations';
import { DynamicFormService } from '../dynamic-form.service';
import { DynamicFormErrorsService } from '../form-errors/form-errors.service';
import {
  FormGroupTypes,
  TFormGroups,
  IDynamicFormConfig,
  FormArrayTypes
} from '../dynamic-form.interface';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { PrivateDynamicFormFacade } from '../+state/private-dynamic-form.facade';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [expandFromCenter]
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  set formName(name: string | undefined) {
    this._name = name;
  }
  private _name: string | undefined;

  public form: FormGroup | undefined;
  private unsubscribe = new Subject<void>();

  config$: Observable<IDynamicFormConfig>;
  formIdx$: Observable<number>;
  structure$: Observable<TFormGroups>;
  validators$: Observable<ValidatorFn[]>;

  constructor(
    private service: DynamicFormService,
    private errorsService: DynamicFormErrorsService,
    private facade: DynamicFormFacade,
    private privateFacade: PrivateDynamicFormFacade
  ) {}

  ngOnInit() {
    this.initDynamicForm();
  }

  ngOnChanges() {
    // When the form name changes, unsubscribe from all and init the new form
    this.ngOnDestroy();
    this.initDynamicForm();
  }

  initDynamicForm() {
    // Error Checks to ensure and ID has been set and initialized in the store
    if (!this._name) {
      throw new Error('Form name must bes set');
    }
    this.privateFacade.checkExistsAndThrow(this._name);

    // From this point on we can guarantee the form is configured
    this.structure$ = this.privateFacade.selectStructure(
      this._name
    ) as Observable<TFormGroups>;

    this.config$ = this.privateFacade.selectConfig(this._name) as Observable<
      IDynamicFormConfig
    >;

    this.formIdx$ = this.privateFacade.selectIndex(this._name) as Observable<
      number
    >;

    this.validators$ = this.privateFacade.selectValidators(
      this._name
    ) as Observable<ValidatorFn[]>;

    this.structure$
      .pipe(
        // Build the form
        map(str => this.service.formBuilder(str)),
        // Add the form validators
        withLatestFrom(this.validators$),
        tap(([form, validators]) => form.setValidators(validators)),
        map(([form]) => form),
        // Set the internal form property with the new form
        tap(form => (this.form = form)),
        // Switch to the observable of the change in form values
        switchMap(form =>
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
      .subscribe(data => {
        // Update the store
        this.facade.updateData(this._name as string, data);
      });

    /**
     * The set data method does not update the store, it resets the form with the data
     *
     * When the form resets, it will emit a value changed event and subsequently will update the store
     * @param data
     */
    this.privateFacade
      .setData$(this._name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        (this.form as FormGroup).reset(data);
      });

    this.privateFacade
      .submitTriggers(this._name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.onSubmit(this.form);
      });
  }

  onSubmit(form: FormGroup | undefined) {
    if (form) {
      if (form.valid) {
        this.privateFacade.clearErrors(this._name as string);
        this.privateFacade.internalSubmit(this._name as string, form.value);
      } else {
        // collect all form errors
        const errors = this.service.getAllFormErrors(form);
        this.privateFacade.setErrors(this._name as string, errors);
        this.errorsService.createFormErrors(this._name as string);
      }
    }
  }

  getFormGroup(formGroup: FormGroup, name: string): FormGroup {
    return formGroup.get(name) as FormGroup;
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  get topLevelContext() {
    return { formGroup: this.form };
  }

  createTemplateOutletContext(formGroup: FormGroup, structure: any) {
    return { formGroup, structure };
  }
}
