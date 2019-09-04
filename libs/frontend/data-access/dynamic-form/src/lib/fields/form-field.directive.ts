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
import { TField, FormGroupTypes } from '../form.models';
import { COMPONENT_MAP } from './component-map';

@Directive({
  selector: '[dynamicFormField]'
})
export class DynamicFormFieldDirective implements OnInit, OnChanges {
  @Input() idx: number | undefined;
  @Input() type!: FormGroupTypes;
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
        COMPONENT_MAP[this.field.componentType]
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
    this.component.instance.type = this.type;
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
    this.component.instance.idx = this.idx;
  }
}
