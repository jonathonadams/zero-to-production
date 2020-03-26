import { NgModule } from '@angular/core';
import { ExampleTodosComponent } from './example-todos/example-todos.component';
import { ExamplesSecureTodosRoutingModule } from './examples-secure-todos-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [ExampleTodosComponent];

@NgModule({
  imports: [CommonModule, MatButtonModule, ExamplesSecureTodosRoutingModule],
  declarations: COMPONENTS,
})
export class ExamplesSecureTodosModule {
  static get lazyEntryComponent() {
    return ExampleTodosComponent;
  }
}
