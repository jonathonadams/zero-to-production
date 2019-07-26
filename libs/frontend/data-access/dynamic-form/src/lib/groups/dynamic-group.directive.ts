import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { IFormGroup } from '../form.models';
import { FormGroupComponent } from './group.component';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appDynamicGroup]'
})
export class DynamicGroupDirective implements OnInit, OnChanges {
  @Input() form!: FormGroup;
  @Input() group!: IFormGroup;
  component!: ComponentRef<FormGroupComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const componentFactory = this.resolver.resolveComponentFactory<
      FormGroupComponent
    >(FormGroupComponent);
    this.viewContainerRef.clear();
    this.component = this.viewContainerRef.createComponent(componentFactory);

    this.component.instance.group = this.group;
    this.component.instance.form = this.form;
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.group = this.group;
      this.component.instance.form = this.form;
    }
  }
}
