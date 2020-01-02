import { Injectable } from '@angular/core';
import {
  TField,
  IDynamicFormConfig,
  TFormGroup,
  FormFieldTypes,
  FormGroupTypes,
  IInputField,
  ISelectField,
  ISelectOption
} from '@uqt/data-access/dynamic-form';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormBuilderConstructorService {
  private dropListIdsSubject = new BehaviorSubject<string[]>([]);
  dropListIds$: Observable<string[]> = this.dropListIdsSubject.asObservable();

  get toolBoxGroupId() {
    return 'uqt-tb-form-group';
  }
  get toolBoxFieldId() {
    return 'uqt-tb-field-group';
  }

  constructor(private fb: FormBuilder) {}

  // The field id' and the connectedToIds' is so that the drag and drop
  // elements from the toolbox and the and the form builder know about
  // each other. The state is shared across the service to de-couple
  // the toolbox and the form-builder components
  createConnectedToId(groups: number) {
    const ids: string[] = [];
    for (let i = 0; i < groups; i++) {
      ids.push(this.createFieldId(i));
    }
    this.dropListIdsSubject.next(ids);
  }

  createFieldId(index: number) {
    return `uqt-fb-fields-${index}`;
  }

  formBuilder(config: IDynamicFormConfig): FormGroup {
    // Top level group
    const form = this.fb.group({
      config: this.fb.group({
        formName: [config.formName, Validators.required],
        animations: [config.animations],
        paginateSections: [config.paginateSections],
        structure: this.fb.array([])
      })
    });

    config.structure.forEach(group => {
      const builderGroup = this.createFormGroupFromGroup(group);
      const fieldsArray = builderGroup.get('fields') as FormArray;

      group.fields.forEach(field => {
        fieldsArray.push(this.createFieldGroupFromFiled(field));
      });

      ((form.get('config') as FormGroup).get('structure') as FormArray).push(
        builderGroup
      );
    });

    return form;
  }

  createFormGroupFromGroup(group: TFormGroup): FormGroup {
    return this.fb.group({
      groupName: [group.groupName, Validators.required],
      groupType: [group.groupType, Validators.required],
      fields: this.fb.array([])
    });
  }

  createFormGroup(type: FormGroupTypes): FormGroup {
    return this.fb.group({
      groupName: ['', Validators.required],
      groupType: [type, Validators.required],
      fields: this.fb.array([])
    });
  }

  createFieldGroupFromFiled(field: TField) {
    const baseGroup: any = {
      name: [field.name, Validators.required],
      label: [field.label, Validators.required],
      type: [field.type, Validators.required]
    };

    if (field.type === FormFieldTypes.Input) {
      baseGroup['inputType'] = [
        (field as IInputField).inputType,
        Validators.required
      ];
    }

    if (field.type === FormFieldTypes.Select) {
      const optionsArray = this.fb.array([]);
      (field as ISelectField).selectOptions.forEach(option => {
        optionsArray.push(this.createSelectOptionFromOption(option));
      });

      baseGroup['selectOptions'] = optionsArray;
    }

    return this.fb.group(baseGroup);
  }

  createFieldGroup(type: FormFieldTypes) {
    const baseGroup: any = {
      name: ['', Validators.required],
      label: ['', Validators.required],
      type: [type]
    };

    if (type === FormFieldTypes.Input) {
      baseGroup['inputType'] = ['text', Validators.required];
    }

    if (type === FormFieldTypes.Select) {
      const optionsArray = this.fb.array([]);
      baseGroup['selectOptions'] = optionsArray;
    }

    return this.fb.group(baseGroup);
  }

  createSelectOptionFromOption(option: ISelectOption) {
    return this.fb.group({
      display: [option.display, Validators.required],
      value: [option.value, Validators.required]
    });
  }

  createSelectOption() {
    return this.fb.group({
      display: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  /**
   * Removes the FormGroup from it's current index and inserts it
   * at the new index value
   *
   * @param arrayGroup
   * @param currentIndex
   * @param newIndex
   */
  moveFormArrayGroup(
    arrayGroup: FormArray,
    currentIndex: number,
    newIndex: number
  ): void {
    const controlBeingRemoved = arrayGroup.at(currentIndex);
    arrayGroup.removeAt(currentIndex);
    arrayGroup.insert(newIndex, controlBeingRemoved);
  }

  /**
   * Remove the group from the old section and add to the new
   * @param newArrayGroup
   * @param previousArrayGroup
   * @param newIndex
   * @param previousIndex
   */
  moveBetweenArrayGroup(
    newArrayGroup: FormArray,
    previousArrayGroup: FormArray,
    newIndex: number,
    previousIndex: number
  ): void {
    const controlBeingMoved = previousArrayGroup.at(previousIndex);
    previousArrayGroup.removeAt(previousIndex);
    newArrayGroup.insert(newIndex, controlBeingMoved);
  }
}
