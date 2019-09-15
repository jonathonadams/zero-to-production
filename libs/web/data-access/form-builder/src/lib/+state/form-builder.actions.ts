import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IFormBuilderStructure } from '@ngw/types';

export const selectForm = createAction(
  '[Form/Builder] Select',
  props<{ id: string }>()
);

export const clearSelected = createAction('[Form/Builder] Clear');

export const loadForms = createAction('[Form/Builder] Load Forms');

export const loadFormsSuccess = createAction(
  '[Form/Builder] Load Success',
  props<{ forms: IFormBuilderStructure[] }>()
);

export const loadFormsFail = createAction(
  '[Form/Builder] Load Fail',
  props<{ error: string }>()
);

export const createForm = createAction(
  '[Form/Builder] Create ',
  props<{ form: IFormBuilderStructure }>()
);
export const createFormSuccess = createAction(
  '[Form/Builder] Create Success',
  props<{ form: IFormBuilderStructure }>()
);

export const createFormFail = createAction(
  '[Form/Builder] Create Fail',
  props<{ error: string }>()
);

export const updateForm = createAction(
  '[Form/Builder] Update ',
  props<{ form: IFormBuilderStructure }>()
);
export const updateFormSuccess = createAction(
  '[Form/Builder] Update Success',
  props<{ form: Update<IFormBuilderStructure> }>()
);

export const updateFormFail = createAction(
  '[Form/Builder] Update Fail',
  props<{ error: string }>()
);

export const deleteForm = createAction(
  '[Form/Builder] Delete',
  props<{ form: IFormBuilderStructure }>()
);

export const deleteFormSuccess = createAction(
  '[Form/Builder] Delete Success',
  props<{ id: string }>()
);

export const deleteFormFail = createAction(
  '[Form/Builder] Delete Fail',
  props<{ error: string }>()
);

export const createFormFromBuilderConfig = createAction(
  '[Form/Builder] Creat From Config',
  props<{ config: IFormBuilderStructure }>()
);

export const addFormGroup = createAction('[Form/Builder] Add FormGroup ');
