import {
  Directive,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  ComponentRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IFormErrors } from '../form.models';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { tap, filter } from 'rxjs/operators';
import { FormErrorsComponent } from './form-errors.component';

@Directive({
  selector: '[formErrors]'
})
export class FormErrorsDirective implements OnDestroy {
  private subscription: Subscription;
  private component!: ComponentRef<FormErrorsComponent>;

  constructor(
    private factory: ComponentFactoryResolver,
    private view: ViewContainerRef,
    private facade: DynamicFormFacade
  ) {
    this.subscription = (this.facade.errors$ as Observable<IFormErrors>)
      .pipe(
        tap(error => (error === null ? this.view.clear() : undefined)),
        filter(error => error !== null),
        tap(() => this.createComponent())
      )
      .subscribe(errors => {
        this.setErrors(this.component, errors);
      });
  }

  createComponent() {
    const componentFactory = this.factory.resolveComponentFactory(
      FormErrorsComponent
    );
    this.component = this.view.createComponent(componentFactory);
  }

  setErrors(component: ComponentRef<FormErrorsComponent>, errors: IFormErrors) {
    component.instance.errors = errors;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
