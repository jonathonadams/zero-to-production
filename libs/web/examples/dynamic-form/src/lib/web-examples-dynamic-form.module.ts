import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesDynamicFormRouterModule } from './web-examples-dynamic-form-router.module';
import { ExampleDynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExampleUiDynamicFormComponent } from './ui-dynamic-form/ui-dynamic-form.component';
import { DataAccessDynamicFormModule } from '@ngw/data-access/dynamic-form';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { CommonUiCardModule } from '@ngw/common/ui/card';
import { PrismTokenizer } from './prism/tokenizer/tokenizer.component';
import { PrismHighlighter } from './prism/highlighter/highlighter.component';

const COMPONENTS = [
  ExampleDynamicFormComponent,
  ExampleUiDynamicFormComponent,
  PrismTokenizer,
  PrismHighlighter
];

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CommonUiCardModule,
    ExamplesDynamicFormRouterModule,
    DataAccessDynamicFormModule
  ],
  declarations: COMPONENTS
})
export class WebExamplesDynamicFormModule {}
