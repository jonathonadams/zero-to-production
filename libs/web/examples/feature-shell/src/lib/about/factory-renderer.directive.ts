import {
  Directive,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef
} from '@angular/core';

@Directive({
  selector: '[appFactoryRender]'
})
export class FactoryRenderedDirective {
  private componentRef: ComponentRef<any> | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  @Input() componentFactory: ComponentFactory<any> | undefined;

  // ngOnInit() {
  //   const componentFactory = this.componentFactory;
  //   if (componentFactory) {
  //     this.componentRef = this.viewContainerRef.createComponent(
  //       componentFactory
  //     );
  //   }
  // }
}
