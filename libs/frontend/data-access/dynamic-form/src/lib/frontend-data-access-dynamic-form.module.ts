import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './form/form.component';
import { InputComponent } from './fields/input/input.component';
import { SelectComponent } from './fields/select/select.component';
import { DynamicFieldDirective } from './form/dynamic-field.directive';
import { DynamicFormFacade } from './+state/dynamic-form.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DynamicFormsEffects } from './+state/dynamic-form.effects';
import { reducer, initialFormState } from './+state/dynamic-form.reducer';
import { CustomMaterialModule } from '@workspace/common/ui/custom-material';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { FormErrorPipe } from './form-errors/form-error.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forFeature('ngrxForm', reducer, {
      initialState: initialFormState
    }),
    EffectsModule.forFeature([DynamicFormsEffects])
  ],
  providers: [DynamicFormFacade],
  declarations: [
    InputComponent,
    SelectComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    FormErrorsComponent,
    FormErrorsComponent,
    FormErrorPipe
  ],
  entryComponents: [InputComponent, SelectComponent],
  exports: [DynamicFormComponent, FormErrorsComponent]
})
export class DataAccessDynamicFormModule {}
