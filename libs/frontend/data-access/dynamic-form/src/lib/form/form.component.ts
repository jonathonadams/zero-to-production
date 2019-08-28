import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  map,
  tap,
  debounceTime,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { TFormGroups } from '../form.models';
import { expandFromCenter } from '@ngw/frontend/common/animations';
import { IDynamicFormConfig } from '../+state/dynamic-form.reducer';
import { DynamicFormService } from '../form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandFromCenter]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  public form: FormGroup | undefined;

  config$: Observable<IDynamicFormConfig>;
  formIdx$: Observable<number>;
  structure$: Observable<TFormGroups>;

  constructor(
    private service: DynamicFormService,
    private facade: DynamicFormFacade
  ) {
    this.config$ = this.facade.config$;
    this.formIdx$ = this.facade.idx$;
    this.structure$ = this.facade.structure$;
  }

  ngOnInit() {
    this.facade.resetIndex();

    this.subscription = this.structure$
      .pipe(
        // Build the form
        map(str => this.service.formBuilder(str)),
        // Add the form validators
        withLatestFrom(this.facade.validators$),
        tap(([form, validators]) => form.setValidators(validators)),
        map(([form]) => form),
        // Set the internal form property with the new form
        tap(form => (this.form = form)),
        // Update the store with default values
        tap(({ value: data }) => this.facade.updateData({ data })),
        // Switch to the observable of the change in form values
        switchMap(form =>
          form.valueChanges.pipe(
            // Wait 200ms before updating the store
            debounceTime(200)
          )
        )
      )
      .subscribe(data => {
        // Update the store
        this.facade.updateData({ data });
      });

    /**
     * The set data method does not update the store, it resets the form with the data
     *
     * When the form resets, it will emit a value changed event and subsequently will update the store
     * @param data
     */
    this.subscription.add(
      this.facade.setData$.subscribe(data => {
        (this.form as FormGroup).reset(data);
      })
    );
  }

  onSubmit(form: FormGroup) {
    const { valid } = form;
    if (valid) {
      this.facade.submitForm();
      // this.formSubmit.emit(value);
      this.facade.clearErrors();
    } else {
      // collect all form errors
      const errors = this.service.getAllFormErrors(form);
      this.facade.setErrors({ errors });
    }
  }

  getFormGroup(name: string): FormGroup {
    return (this.form as FormGroup).get(name) as FormGroup;
  }

  nextSection() {
    this.facade.nextSection();
  }

  backASection() {
    this.facade.backASection();
  }

  ngOnDestroy() {
    (this.subscription as Subscription).unsubscribe();
  }
}
