import {
  Directive,
  ViewContainerRef,
  Input,
  ComponentFactory,
  ComponentRef
} from '@angular/core';

@Directive({
  selector: '[componentFactoryRenderer]'
})
export class ComponentFactorRendererDirective {
  private componentRef: ComponentRef<any> | undefined;

  constructor(private viewContainerRef: ViewContainerRef) {}

  @Input()
  set componentFactory(factory: ComponentFactory<any> | null | undefined) {
    if (factory) {
      this.viewContainerRef.clear();
      this.componentRef = this.viewContainerRef.createComponent(factory);
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }
}
