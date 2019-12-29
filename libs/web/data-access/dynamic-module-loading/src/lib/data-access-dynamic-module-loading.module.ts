import { NgModule } from '@angular/core';
import { ComponentFactorRendererDirective } from './factory-renderer.directive';
import { LazyLoadScrollDirective } from './scroll/lazy-load-scroll.directive';

const DECLARATIONS = [
  [ComponentFactorRendererDirective, LazyLoadScrollDirective]
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class DataAccessDynamicModuleLoadingModule {}
