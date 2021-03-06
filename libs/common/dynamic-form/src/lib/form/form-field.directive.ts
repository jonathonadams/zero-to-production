import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef,
  Inject,
  InjectionToken,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormGroupTypes,
  TField,
  DynamicFormComponentMap,
} from '../dynamic-form.interface';

export interface IDynamicFormField {
  idx: number | undefined;
  type: FormGroupTypes;
  field: TField;
  group: FormGroup;
}

export const DYNAMIC_FORM_COMPONENTS = new InjectionToken<
  DynamicFormComponentMap
>('DYNAMIC_FORM_COMPONENTS');

@Directive({
  selector: '[appDynamicFormField]',
})
export class DynamicFormFieldDirective implements OnInit, OnChanges, OnDestroy {
  @Input() idx: number | undefined;
  @Input() type: FormGroupTypes;
  @Input() field: TField;
  @Input() group: FormGroup;
  component: ComponentRef<IDynamicFormField>;

  constructor(
    @Inject(DYNAMIC_FORM_COMPONENTS)
    private componentMap: DynamicFormComponentMap,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const component = this.resolver.resolveComponentFactory<IDynamicFormField>(
      this.componentMap[this.field.type]
    );

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

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }
}
