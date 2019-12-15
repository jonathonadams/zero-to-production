import { NgModule } from '@angular/core';
import { ComponentFactorRendererDirective } from './factory-renderer.directive';

@NgModule({
  declarations: [ComponentFactorRendererDirective],
  exports: [ComponentFactorRendererDirective]
})
export class DataAccessDynamicModuleLoadingModule {}
