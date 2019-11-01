import { NgModule } from '@angular/core';
import { ExamplesTodosRouterModule } from './examples-todos-router.module';
import { TodosOutlineComponent } from './todos-outline/todos-outline.component';

const COMPONENTS = [TodosOutlineComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [ExamplesTodosRouterModule]
})
export class ExamplesTodosModule {}
