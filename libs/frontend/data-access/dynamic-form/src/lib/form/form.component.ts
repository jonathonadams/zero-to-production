import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
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
  private unsubscribe$ = new Subject<void>();

  config$: Observable<IDynamicFormConfig>;
  formIdx$: Observable<number>;
  structure$: Observable<TFormGroups>;
  data$: Observable<any>;
  touched$: Observable<boolean>;
  form!: FormGroup;

  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private service: DynamicFormService,
    private facade: DynamicFormFacade
  ) {
    this.config$ = this.facade.config$;
    this.formIdx$ = this.facade.idx$;
    this.structure$ = this.facade.structure$;
    this.data$ = this.facade.data$;
    this.touched$ = this.facade.touched$;
  }

  ngOnInit() {
    this.facade.resetIndex();

    this.structure$
      .pipe(
        map(str => this.service.formBuilder(str)),
        tap(form => (this.form = form)),
        tap(form => this.listenFormChanges(form)),
        switchMap(() => this.data$),
        takeUntil(this.unsubscribe$) // TODO -> subscription
      )
      .subscribe(data => this.patchValue(data));

    // this.data$
    //   .pipe(
    //     filter(() => !!this.form),
    //     take(1)
    //   )
    //   .subscribe(data => this.patchValue(data));

    this.touched$
      .pipe(
        filter(t => !t && !!this.form),
        takeUntil(this.unsubscribe$) // TODO -> subscription
      )
      .subscribe(_ => (this.form as FormGroup).reset());
  }

  private patchValue(data: any = {}) {
    this.form.patchValue(data, { emitEvent: false });
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
