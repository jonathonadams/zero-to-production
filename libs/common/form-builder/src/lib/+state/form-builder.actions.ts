import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IDynamicFormConfig } from '@uqt/common/dynamic-form';

export const selectForm = createAction(
  '[Form/Builder] Select',
  props<{ formName: string }>()
);

export const clearSelected = createAction('[Form/Builder] Clear');

export const loadForms = createAction('[Form/Builder] Load Forms');

export const loadFormsSuccess = createAction(
  '[Form/Builder] Load Success',
  props<{ forms: IDynamicFormConfig[] }>()
);

export const loadFormsFail = createAction(
  '[Form/Builder] Load Fail',
  props<{ error: string }>()
);

export const createForm = createAction(
  '[Form/Builder] Create',
  props<{ form: Partial<IDynamicFormConfig> }>()
);
export const createFormSuccess = createAction(
  '[Form/Builder] Create Success',
  props<{ form: IDynamicFormConfig }>()
);

export const createFormFail = createAction(
  '[Form/Builder] Create Fail',
  props<{ error: string }>()
);

export const updateForm = createAction(
  '[Form/Builder] Update ',
  props<{ form: IDynamicFormConfig }>()
);
export const updateFormSuccess = createAction(
  '[Form/Builder] Update Success',
  props<{ form: Update<IDynamicFormConfig> }>()
);

export const updateFormFail = createAction(
  '[Form/Builder] Update Fail',
  props<{ error: string }>()
);

export const deleteForm = createAction(
  '[Form/Builder] Delete',
  props<{ form: IDynamicFormConfig }>()
);

export const deleteFormSuccess = createAction(
  '[Form/Builder] Delete Success',
  props<{ formName: string }>()
);

export const deleteFormFail = createAction(
  '[Form/Builder] Delete Fail',
  props<{ error: string }>()
);

export const addFormGroup = createAction('[Form/Builder] Add FormGroup ');
