import { NgModule } from '@angular/core';
import { ExampleTodosComponent } from './example-todos/example-todos.component';
import { SecureTodosRoutingModule } from './web-examples-secure-todos-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [ExampleTodosComponent];

@NgModule({
  imports: [CommonModule, MatButtonModule, SecureTodosRoutingModule],
  declarations: COMPONENTS
})
export class WebExamplesSecureTodosModule {
  static get lazyEntryComponent() {
    return ExampleTodosComponent;
  }
}
