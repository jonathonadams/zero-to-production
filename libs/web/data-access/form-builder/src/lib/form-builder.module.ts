import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { StoreModule } from '@ngrx/store';
import { FormsEntityState, reducer } from './+state/form-builder.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FormEffects } from './+state/form-builder.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderConfigComponent } from './form-config/form-config.component';
import { FormBuilderHeaderComponent } from './form-header/form-header.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FormBuilderConfigComponent,
    FormBuilderHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormModule,
    CustomMaterialModule,
    DragDropModule,
    StoreModule.forFeature<FormsEntityState>('formsState', reducer),
    EffectsModule.forFeature([FormEffects])
  ],
  exports: [FormBuilderComponent]
})
export class DataAccessFormBuilderModule {}
