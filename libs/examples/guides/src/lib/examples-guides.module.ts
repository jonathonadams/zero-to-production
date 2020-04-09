import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLayoutsModule } from '@ztp/common/ui/layouts';
import { MarkedPipe } from '@ztp/examples/utils';
import { GuidesComponent } from './guides/guides.component';
import { ExamplesGuidesRoutingModule } from './examples-guides-routing.module';
import { MarkdownComponent } from './markdown/markdown.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    ExamplesGuidesRoutingModule,
    CommonUiLayoutsModule,
    MatTabsModule,
  ],
  declarations: [GuidesComponent, MarkedPipe, MarkdownComponent],
})
export class ExamplesGuidesModule {}
