import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  Injector
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

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  structure$: Observable<TFormGroups>;
  data$: Observable<any>;
  touched$: Observable<boolean>;
  form!: FormGroup;

  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private injector: Injector,
    private facade: DynamicFormFacade
  ) {
    this.structure$ = this.facade.structure$;
    this.data$ = this.facade.data$;
    this.touched$ = this.facade.touched$;
  }

  ngOnInit() {
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
      group.fields.forEach(nestedGroup => {
        fg.addControl(nestedGroup.name, this.createControl(nestedGroup));
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
      '',
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
      const errors = this.getAllFormControlErrors(form);
      this.facade.setErrors({ errors });
    }
  }

  // TODO -> Handle nested form groups
  getAllFormControlErrors(form: FormGroup) {
    // console.log(form);

    const formErrors: IFormErrors = {};

    if (form.errors) {
      formErrors['form'] = form.errors;
    }

    this.temp(form, formErrors);

    console.log('$$$$$$$$$$$$$$$$$$$$');
    console.log(formErrors);
    return formErrors;
  }

  temp(form: FormGroup, formErrors: IFormErrors): IFormErrors {
    const formControls = Object.keys(form.controls);

    formControls.forEach(controlName => {
      const control: AbstractControl | FormGroup = form.controls[controlName];

      console.log(control);
      if ((control as FormGroup).controls !== undefined) {
        // it is a form croup
        if (control.errors !== null) {
          formErrors[controlName] = control.errors;
        }
        this.temp(control as FormGroup, formErrors);
      } else {
        // it is a control

        console.log('@@@@@@@@@@@@@@@@@@@@@');
        console.log(control);

        if (control.errors !== null) {
          formErrors[controlName] = control.errors;
        }
        // return Object.keys(control.controls).reduce((errors, controlName) => {
        //   if (form.controls[controlName].errors !== null) {
        //     errors[controlName] = form.controls[controlName]
        //       .errors as ValidationErrors;
        //   }
        //   return errors;
        // }, formErrors);
      }
    });
    return formErrors;
  }

  getAllControlErrors(form: FormGroup): IFormErrors {
    if (form.controls === undefined) {
      // return ?
      return {};
    } else {
      return Object.keys(form.controls).reduce((errors, controlName) => {
        return errors;
      }, {});
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
