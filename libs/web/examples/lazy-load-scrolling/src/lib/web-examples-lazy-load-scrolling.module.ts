import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingComponent } from './scrolling/scrolling.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ScrollingComponent]
})
export class WebExamplesLazyLoadScrollingModule {
  static get lazyEntryComponent() {
    return ScrollingComponent;
  }
}
