import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../fields/input/input.component';
import { Field } from '../form.models';
import { FormFieldTypes } from '../form.models';
import { SelectComponent } from '../fields/select/select.component';

const componentsMapper: { [key: string]: Type<any> } = {
  [FormFieldTypes.Input]: InputComponent,
  [FormFieldTypes.Select]: SelectComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() field!: Field;
  @Input() group!: FormGroup;
  component!: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const component = this.resolver.resolveComponentFactory<any>(
      componentsMapper[this.field.component]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }
}
