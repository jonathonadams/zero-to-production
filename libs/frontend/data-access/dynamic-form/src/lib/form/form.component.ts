import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  map,
  tap,
  debounceTime,
  takeUntil,
  filter,
  switchMap
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
  data$: Observable<any>;

  // The
  // @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private service: DynamicFormService,
    private facade: DynamicFormFacade
  ) {
    this.config$ = this.facade.config$;
    this.formIdx$ = this.facade.idx$;
    this.structure$ = this.facade.structure$;
    this.data$ = this.facade.data$;
  }

  ngOnInit() {
    this.facade.resetIndex();

    this.subscription = this.structure$
      .pipe(
        // Build the form
        map(str => this.service.formBuilder(str)),
        // Set the internal form property with the new form
        tap(form => (this.form = form)),
        // Update the store with default values
        tap(form => this.facade.updateData({ data: form.value })),
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
  }

  onSubmit(form: FormGroup) {
    const { valid, value } = form;
    if (valid) {
      this.facade.submit();
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
