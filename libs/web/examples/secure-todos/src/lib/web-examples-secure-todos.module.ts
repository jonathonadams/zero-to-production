import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureTodosComponent } from './secure-todos/secure-todos.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SecureTodosComponent]
})
export class WebExamplesSecureTodosModule {
  static get lazyEntryComponent() {
    return SecureTodosComponent;
  }
}
