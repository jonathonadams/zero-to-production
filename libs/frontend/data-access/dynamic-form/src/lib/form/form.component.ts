import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  AsyncValidator,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, debounceTime, takeUntil, filter } from 'rxjs/operators';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { TField, IFormErrors, TFormGroups } from '../form.models';
import { dynamicFormTransitions } from './form.animations';
import { IDynamicFormConfig } from '../+state/dynamic-form.reducer';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dynamicFormTransitions]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  config$: Observable<IDynamicFormConfig>;
  formIdx$: Observable<number>;
  structure$: Observable<TFormGroups>;
  data$: Observable<any>;
  touched$: Observable<boolean>;
  form!: FormGroup;

  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private injector: Injector,
    private facade: DynamicFormFacade,
    private cd: ChangeDetectorRef
  ) {
    this.config$ = this.facade.config$;
    this.formIdx$ = this.facade.idx$;
    this.structure$ = this.facade.structure$;
    this.data$ = this.facade.data$;
    this.touched$ = this.facade.touched$;
  }

  ngOnInit() {
    this.facade.resetIndex();

    combineLatest([
      this.structure$.pipe(
        map(str => this.formBuilder(str)),
        tap(form => (this.form = form)),
        tap(form => this.listenFormChanges(form))
      ),
      this.data$
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.patchValue);

    if (this.touched$) {
      this.touched$
        .pipe(
          filter(t => !t && !!this.form),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(_ => (this.form as FormGroup).reset());
    }
  }

  private formBuilder(structure: TFormGroups): FormGroup {
    // Top level group
    const form = this.fb.group({});

    // For each top level group
    structure.forEach(group => {
      // Create a form group,
      const fg = this.fb.group({});
      // and add all nested groups to the form
      group.fields.forEach(field => {
        fg.addControl(field.name, this.createControl(field));
      });
      // then add the nested form group to the top level group
      form.addControl(group.name, fg);
    });
    return form;
  }

  private createControl(field: TField): FormControl {
    const asyncValidators: AsyncValidatorFn[] = [];
    if (field.asyncValidators) {
      field.asyncValidators.forEach(di => {
        const validator = this.injector.get<AsyncValidator>(di);
        asyncValidators.push(validator.validate.bind(validator));
      });
    }

    return this.fb.control(
      field.initialValue ? field.initialValue : '',
      Validators.compose(field.validators ? field.validators : []),
      asyncValidators
    );
  }

  private patchValue([form, data = {}]: [FormGroup, any]) {
    form.patchValue(data, { emitEvent: false });
  }

  private listenFormChanges(form: FormGroup) {
    form.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: any) => this.facade.updateData({ data }));
  }

  onSubmit(form: FormGroup) {
    const { valid, value } = form;
    if (valid) {
      this.formSubmit.emit(value);
      this.facade.clearErrors();
    } else {
      // collect all form errors
      const errors = this.getAllFormErrors(form);
      this.facade.setErrors({ errors });
    }
  }

  getAllFormErrors(form: FormGroup) {
    const errors: IFormErrors = {};
    if (form.errors) {
      errors['form'] = form.errors;
    }
    return { ...errors, ...this.getControlErrors(form) };
  }

  getControlErrors(form: FormGroup): IFormErrors {
    // Get a list of all the control names
    const formControls = Object.keys(form.controls);
    /*
     * Iterate over them, each time checking if it is a form control or group
     * if it is a group, then recursively collect the errors
     */
    return formControls.reduce(
      (errors, controlName) => {
        const control = form.controls[controlName];

        if (this.isControlAFormGroup(control)) {
          // A form group may have a top level for error
          if (this.controlHasErrors(control)) {
            errors[controlName] = control.errors as ValidationErrors;
          }

          return {
            ...errors,
            ...this.getControlErrors(control as FormGroup)
          };
        } else {
          // it is a control
          if (this.controlHasErrors(control)) {
            errors[controlName] = control.errors as ValidationErrors;
          }
          return errors;
        }
      },
      {} as IFormErrors
    );
  }

  isControlAFormGroup(control: AbstractControl | FormGroup) {
    return (control as FormGroup).controls !== undefined;
  }

  controlHasErrors(control: AbstractControl | FormGroup) {
    return control.errors !== null;
  }

  getFormGroup(name: string): FormGroup {
    return this.form.get(name) as FormGroup;
  }

  nextSection() {
    this.facade.nextSection();
    this.cd.detectChanges();
  }

  backASection() {
    this.facade.backASection();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
