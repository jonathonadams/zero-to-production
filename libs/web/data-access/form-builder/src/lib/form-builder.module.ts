import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormBuilderEntityState, reducer } from './+state/form-builder.reducer';
import { FormEffects } from './+state/form-builder.effects';
import { FormBuilderConfigComponent } from './form-builder/form-config/form-config.component';
import { FormBuilderHeaderComponent } from './form-builder/form-header/form-header.component';
import { FormBuilderFieldComponent } from './form-builder/form-field/form-field.component';
import { FormBuilderToolboxComponent } from './form-builder/form-builder-toolbox/form-builder-toolbox.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FormBuilderConfigComponent,
    FormBuilderHeaderComponent,
    FormBuilderFieldComponent,
    FormBuilderToolboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DynamicFormModule,
    CustomMaterialModule,
    DragDropModule,
    StoreModule.forFeature<FormBuilderEntityState>('formBuilderState', reducer),
    EffectsModule.forFeature([FormEffects])
  ],
  exports: [FormBuilderComponent]
})
export class DataAccessFormBuilderModule {}
