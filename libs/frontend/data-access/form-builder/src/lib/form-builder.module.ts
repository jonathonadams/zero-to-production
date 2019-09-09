import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessDynamicFormModule } from '@ngw/frontend/data-access/dynamic-form';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { StoreModule } from '@ngrx/store';
import { FormsEntityState, reducer } from './+state/form-builder.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FormEffects } from './+state/form-builder.effects';

const COMPONENTS = [FormBuilderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    DataAccessDynamicFormModule,
    CustomMaterialModule,
    StoreModule.forFeature<FormsEntityState>('formsState', reducer),
    EffectsModule.forFeature([FormEffects])
  ],
  exports: [FormBuilderComponent]
})
export class DataAccessFormBuilderModule {}
