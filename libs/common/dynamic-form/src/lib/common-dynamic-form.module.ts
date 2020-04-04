import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormComponent } from './form/dynamic-form.component';
import {
  DynamicFormFieldDirective,
  DYNAMIC_FORM_COMPONENTS,
} from './form/form-field.directive';
import { DynamicFormsEffects } from './+state/dynamic-form.effects';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { DynamicFormConfig } from './dynamic-form.interface';
import {
  DYNAMIC_FORM_ERRORS,
  defaultErrorMessages,
} from './form-errors.interface';
import * as fromDynamicForm from './+state/dynamic-form.reducer';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  declarations: [DynamicFormComponent, DynamicFormFieldDirective],
  exports: [DynamicFormComponent],
})
export class CommonDynamicFormModule {
  static forRoot({
    components,
    errors = defaultErrorMessages,
  }: DynamicFormConfig): ModuleWithProviders<RootCommonDynamicFormModule> {
    return {
      ngModule: RootCommonDynamicFormModule,
      providers: [
        {
          provide: DYNAMIC_FORM_COMPONENTS,
          useValue: components,
        },
        {
          provide: DYNAMIC_FORM_ERRORS,
          useValue: errors,
        },
      ],
    };
  }

  static forChild(): ModuleWithProviders<CommonDynamicFormModule> {
    return {
      ngModule: CommonDynamicFormModule,
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    A11yModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature<fromDynamicForm.DynamicFormEntityState>(
      fromDynamicForm.dynamicFormKey,
      fromDynamicForm.reducer
    ),
    EffectsModule.forFeature([DynamicFormsEffects]),
  ],
  declarations: [FormErrorsComponent],
  exports: [CommonDynamicFormModule],
})
export class RootCommonDynamicFormModule {}
