import { NgModule } from '@angular/core';
import { ComponentFactorRendererDirective } from './factory-renderer.directive';
import { LazyLoadScrollDirective } from './scroll/lazy-load-scroll.directive';
import { ModuleLoaderService } from './module-loader.service';

const DECLARATIONS = [
  [ComponentFactorRendererDirective, LazyLoadScrollDirective],
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [ModuleLoaderService],
})
export class CommonUtilsDynamicModuleLoadingModule {}
