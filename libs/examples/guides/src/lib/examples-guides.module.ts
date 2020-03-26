import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLayoutsModule } from '@ztp/common/ui/layouts';
import { CustomMaterialModule } from '@ztp/common/ui/custom-material';
import { MarkedPipe } from '@ztp/examples/utils';
import { GuidesComponent } from './guides/guides.component';
import { ExamplesGuidesRoutingModule } from './examples-guides-routing.module';
import { MarkdownComponent } from './markdown/markdown.component';

@NgModule({
  imports: [
    CommonModule,
    ExamplesGuidesRoutingModule,
    CommonUiLayoutsModule,
    CustomMaterialModule,
  ],
  declarations: [GuidesComponent, MarkedPipe, MarkdownComponent],
})
export class ExamplesGuidesModule {}
