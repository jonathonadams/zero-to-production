import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonUiButtonsModule } from '@ztp/common/ui/buttons';
import { CommonUiCardModule } from '@ztp/common/ui/card';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import * as fromFormBuilder from './+state/form-builder.reducer';
import { FormBuilderEffects } from './+state/form-builder.effects';
import { FormBuilderHeaderComponent } from './form-builder/form-header/form-header.component';
import { FormBuilderFieldComponent } from './form-builder/form-field/form-field.component';
import { FormBuilderToolboxComponent } from './form-builder-toolbox/form-builder-toolbox.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FormBuilderHeaderComponent,
    FormBuilderFieldComponent,
    FormBuilderToolboxComponent,
  ],
  imports: [
    CommonModule,
    CommonUiButtonsModule,
    CommonUiCardModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonDynamicFormModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    StoreModule.forFeature<fromFormBuilder.FormBuilderEntityState>(
      fromFormBuilder.formBuilderKey,
      fromFormBuilder.reducer
    ),
    EffectsModule.forFeature([FormBuilderEffects]),
  ],
  exports: [FormBuilderComponent, FormBuilderToolboxComponent],
})
export class CommonFormBuilderModule {}
