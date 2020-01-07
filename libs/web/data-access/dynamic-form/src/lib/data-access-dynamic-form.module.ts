import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DynamicFormComponent } from './form/form.component';
import {
  DynamicFormFieldDirective,
  DYNAMIC_FORM_COMPONENTS
} from './form/form-field.directive';
import { DynamicFormsEffects } from './+state/dynamic-form.effects';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { DynamicFormConfig } from './dynamic-form.interface';
import {
  DYNAMIC_FORM_ERRORS,
  defaultErrorMessages
} from './form-errors.interface';
import * as fromDynamicForm from './+state/dynamic-form.reducer';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  declarations: [DynamicFormComponent, DynamicFormFieldDirective],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {
  static forRoot({
    components,
    errors = defaultErrorMessages
  }: DynamicFormConfig): ModuleWithProviders<RootDataAccessDynamicFormModule> {
    return {
      ngModule: RootDataAccessDynamicFormModule,
      providers: [
        {
          provide: DYNAMIC_FORM_COMPONENTS,
          useValue: components
        },
        {
          provide: DYNAMIC_FORM_ERRORS,
          useValue: errors
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders<DynamicFormModule> {
    return {
      ngModule: DynamicFormModule
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature<fromDynamicForm.DynamicFormEntityState>(
      fromDynamicForm.dynamicFormKey,
      fromDynamicForm.reducer
    ),
    EffectsModule.forFeature([DynamicFormsEffects])
  ],
  declarations: [FormErrorsComponent],
  exports: [DynamicFormModule]
})
export class RootDataAccessDynamicFormModule {}
