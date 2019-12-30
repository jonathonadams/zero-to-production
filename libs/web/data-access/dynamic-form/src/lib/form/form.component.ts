import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  ViewEncapsulation
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
  IDynamicFormConfig
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
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() formName: string | undefined;

  public form: FormGroup | undefined;
  private unsubscribe = new Subject<void>();

  config: IDynamicFormConfig;
  formIdx: number;
  structure$: Observable<TFormGroups>;
  validators$: Observable<ValidatorFn[]>;

  constructor(
    private service: DynamicFormService,
    private errorsService: DynamicFormErrorsService,
    private facade: DynamicFormFacade,
    private privateFacade: PrivateDynamicFormFacade
  ) {}

  ngOnInit() {
    // Error Checks to ensure and ID has been set and initialized in the store
    if (!this.formName) {
      throw new Error('Form name must bes set');
    }
    this.privateFacade.checkExistsAndThrow(this.formName);

    // From this point on we can guarantee the form is configured
    this.structure$ = this.privateFacade.selectStructure(
      this.formName
    ) as Observable<TFormGroups>;

    (this.privateFacade.selectConfig(this.formName) as Observable<
      IDynamicFormConfig
    >)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(config => (this.config = config));

    (this.privateFacade.selectIndex(this.formName) as Observable<number>)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(idx => (this.formIdx = idx));

    this.validators$ = this.privateFacade.selectValidators(
      this.formName
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
        this.facade.updateData(this.formName as string, data);
      });

    /**
     * The set data method does not update the store, it resets the form with the data
     *
     * When the form resets, it will emit a value changed event and subsequently will update the store
     * @param data
     */
    this.privateFacade
      .setData$(this.formName)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        (this.form as FormGroup).reset(data);
      });

    this.privateFacade
      .submitTriggers(this.formName)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.onSubmit(this.form);
      });
  }

  onSubmit(form: FormGroup | undefined) {
    if (form) {
      if (form.valid) {
        this.privateFacade.clearErrors(this.formName as string);
        this.privateFacade.internalSubmit(this.formName as string, form.value);
      } else {
        // collect all form errors
        const errors = this.service.getAllFormErrors(form);
        this.privateFacade.setErrors(this.formName as string, errors);
        this.errorsService.createFormErrors(this.formName as string);
      }
    }
  }

  getFormGroup(formGroup: FormGroup, name: string): FormGroup {
    return formGroup.get(name) as FormGroup;
  }

  getArrayGroupControls(arrayGroup: FormArray) {
    return arrayGroup.controls;
  }

  getFormArrayFormGroups(formGroup: FormGroup, name: string): FormGroup[] {
    return (formGroup.get(name) as FormArray).controls as FormGroup[];
  }

  isGroupFields(type: FormGroupTypes): boolean {
    return Boolean(type === FormGroupTypes.Group);
  }

  nextSection() {
    if (this.formName) {
      this.facade.nextSection(this.formName);
    }
  }

  backASection() {
    if (this.formName) {
      this.facade.backASection(this.formName);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
