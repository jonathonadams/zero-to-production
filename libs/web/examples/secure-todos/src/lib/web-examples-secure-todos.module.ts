import { NgModule } from '@angular/core';
import { SecureTodosComponent } from './secure-todos/secure-todos.component';
import { ExampleTodosComponent } from './example-todos/example-todos.component';
import { SecureTodosRoutingModule } from './web-examples-secure-todos-routing.module';

const COMPONENTS = [SecureTodosComponent, ExampleTodosComponent];

@NgModule({
  imports: [SecureTodosRoutingModule],
  declarations: COMPONENTS
})
export class WebExamplesSecureTodosModule {
  static get lazyEntryComponent() {
    return ExampleTodosComponent;
  }
}
