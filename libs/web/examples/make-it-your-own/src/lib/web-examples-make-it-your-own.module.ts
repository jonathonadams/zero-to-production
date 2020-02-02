import { NgModule } from '@angular/core';
import { GuidesComponent } from './guides/guides.component';

@NgModule({
  imports: [],
  declarations: [GuidesComponent]
})
export class WebExamplesMakeItYourOwnModule {
  static get lazyEntryComponent() {
    return GuidesComponent;
  }
}
