import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef,
  ComponentFactory
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TField } from '../form.models';
import { componentMap } from './component-map';

@Directive({
  selector: '[appDynamicFormField]'
})
export class DynamicFormFieldDirective implements OnInit, OnChanges {
  @Input() field!: TField;
  @Input() group!: FormGroup;
  component!: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    let component: ComponentFactory<any>;

    if (this.field.customComponent) {
      component = this.resolver.resolveComponentFactory<any>(
        this.field.customComponent
      );
    } else {
      component = this.resolver.resolveComponentFactory<any>(
        componentMap[this.field.componentType]
      );
    }

    this.viewContainerRef.clear();
    this.component = this.viewContainerRef.createComponent(component);

    this.setInstanceProperties();
  }

  ngOnChanges() {
    if (this.component) {
      this.setInstanceProperties();
    }
  }

  setInstanceProperties() {
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}
