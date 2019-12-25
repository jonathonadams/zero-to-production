import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecureTodosComponent } from './secure-todos/secure-todos.component';

@NgModule({
  imports: [RouterModule],
  declarations: [SecureTodosComponent]
})
export class WebExamplesSecureTodosModule {
  static get lazyEntryComponent() {
    return SecureTodosComponent;
  }
}
