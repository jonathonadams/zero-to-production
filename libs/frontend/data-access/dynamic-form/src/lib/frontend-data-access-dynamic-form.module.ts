import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './form/form.component';
import { InputComponent } from './fields/input/input.component';
import { SelectComponent } from './fields/select/select.component';
import { DynamicFormFieldDirective } from './fields/form-field.directive';
import { DynamicFormFacade } from './+state/dynamic-form.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DynamicFormsEffects } from './+state/dynamic-form.effects';
import { reducer, initialFormState } from './+state/dynamic-form.reducer';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { FormErrorPipe } from './form-errors/form-error.pipe';
import { ToggleComponent } from './fields/toggle/toggle.components';
import { DynamicFormService } from './form.service';
import { FormErrorsDirective } from './form-errors/form-errors.directive';
import { UiFormErrorsComponent } from './form-errors/ui/ui-form-errors.component';
import { DatePickerComponent } from './fields/date-picker/date-picker.component';
import { DismissDirective } from './form-errors/dismiss.directive';

const ENTRY_COMPONENTS = [
  InputComponent,
  SelectComponent,
  ToggleComponent,
  DatePickerComponent
];

const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  DynamicFormComponent,
  FormErrorsComponent,
  FormErrorsComponent,
  FormErrorPipe,
  UiFormErrorsComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forFeature('dynoForm', reducer, {
      initialState: initialFormState
    }),
    EffectsModule.forFeature([DynamicFormsEffects])
  ],
  providers: [DynamicFormService, DynamicFormFacade],
  declarations: [
    DynamicFormFieldDirective,
    FormErrorsDirective,
    DismissDirective,
    COMPONENTS
  ],
  entryComponents: [FormErrorsComponent, ...ENTRY_COMPONENTS],
  exports: [DynamicFormComponent, FormErrorsComponent]
})
export class DataAccessDynamicFormModule {}
