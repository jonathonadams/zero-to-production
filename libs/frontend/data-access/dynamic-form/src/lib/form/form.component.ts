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
  AsyncValidatorFn
} from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, debounceTime, takeUntil, filter } from 'rxjs/operators';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { Field, FormErrors } from '../form.models';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  structure$: Observable<Field[]>;
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

  private formBuilder(structure: Field[]): FormGroup {
    const group = this.fb.group({});
    structure.forEach(field =>
      group.addControl(field.name, this.createControl(field))
    );
    return group;
  }

  private createControl(field: Field): FormControl {
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
    const formErrors: FormErrors = {};
    if (form.errors) {
      formErrors['form'] = form.errors;
    }
    return Object.keys(form.controls).reduce((errors, controlName) => {
      if (form.controls[controlName].errors !== null) {
        errors[controlName] = form.controls[controlName]
          .errors as ValidationErrors;
      }
      return errors;
    }, formErrors);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
