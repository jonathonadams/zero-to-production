import { NgModule } from '@angular/core';
import { ExampleTodosComponent } from './example-todos/example-todos.component';
import { SecureTodosRoutingModule } from './web-examples-secure-todos-routing.module';

const COMPONENTS = [ExampleTodosComponent];

@NgModule({
  imports: [SecureTodosRoutingModule],
  declarations: COMPONENTS
})
export class WebExamplesSecureTodosModule {
  static get lazyEntryComponent() {
    return ExampleTodosComponent;
  }
}
