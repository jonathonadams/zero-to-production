import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';

const COMPONENTS = [CreateComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule]
})
export class FormBuilderCreateModule {}
