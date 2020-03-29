import { Injectable, Injector } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  FormControl,
  AsyncValidatorFn,
  AsyncValidator,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {
  FormGroupTypes,
  TField,
  FormArrayTypes,
  TFormStructure,
  IFormGroup,
  IFormGroupArray,
  IFormFieldArray,
  FormFieldTypes,
} from './dynamic-form.interface';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  //
  constructor(private injector: Injector, private fb: FormBuilder) {}

  formBuilder(structure: TFormStructure): FormGroup {
    // Top level group
    const form = this.fb.group({});

    // For each top level group
    structure.forEach((group) => {
      const existing = form.get(group.groupName);
      if (existing)
        console.error(
          new Error(
            `Form groups must be unique, ${group.groupName} is used more multiple times`
          )
        );

      if (group.groupType === FormGroupTypes.Group) {
        // Create a form group from the fields
        const fg = this.createFormGroup(group);
        // add the nested form group to the top level group
        form.addControl(group.groupName, fg);
      } else if (group.groupType === FormGroupTypes.Array) {
        if (group.arrayType === FormArrayTypes.Group) {
          // create a form array Group
          const fa = this.createFormGroupArray(group);
          // then add the nested form group to the top level group
          form.addControl(group.groupName, fa);
        } else if (group.arrayType === FormArrayTypes.Field) {
          const fa = this.createFormFieldArray(group);
          // then add the nested form group to the top level group
          form.addControl(group.groupName, fa);
        }
      }
    });

    return form;
  }

  createFormGroup(group: IFormGroup): FormGroup {
    // Create a form group,
    const fg = this.fb.group({});
    // and add all nested groups to the form
    group.fields.forEach((field) => {
      const control = this.createControl(field);
      fg.addControl(field.name, control);
    });

    return fg;
  }

  createFormGroupArray(group: IFormGroupArray): FormArray {
    const fa = this.fb.array([]);

    if (group.number !== undefined) {
      for (let i = 0; i < group.number; i++) {
        // Creat form group
        const fg = this.creatFormGroupOfArrayFields(group.fields);

        // Add the form group to the array
        fa.push(fg);
      }
    }
    return fa;
  }

  createFormFieldArray(group: IFormFieldArray): FormArray {
    const fa = this.fb.array([]);

    if (group.number !== undefined) {
      for (let i = 0; i < group.number; i++) {
        const control = this.createControl(group.field);

        // Add the form group to the array
        fa.push(control);
      }
    }
    return fa;
  }

  creatFormGroupOfArrayFields(fields: TField[]) {
    const fg = this.fb.group({});
    // and add all nested groups to the form
    fields.forEach((field) => {
      const control = this.createControl(field);
      fg.addControl(field.name, control);
    });

    return fg;
  }

  createControl(field: TField): FormControl {
    const asyncValidators: AsyncValidatorFn[] = [];
    if (field.asyncValidators && field.asyncValidators.length > 0) {
      field.asyncValidators.forEach((di) => {
        const validator = this.injector.get<AsyncValidator>(di);
        asyncValidators.push(validator.validate.bind(validator));
      });
    }

    const validators = Validators.compose(
      field.validators ? field.validators : []
    );

    // If the default value is either a toggle or a checkbox, then set default value to false rather than empty string
    const defaultVal =
      // field.type === FormFieldTypes.Toggle ||
      field.type === FormFieldTypes.CheckBox ? false : '';

    return this.fb.control(defaultVal, validators, asyncValidators);
  }

  getAllFormErrors(form: FormGroup): ValidationErrors {
    const errors: ValidationErrors = {};
    if (form.errors) {
      errors['form'] = form.errors;
    }
    return { ...this.getControlErrors(form), ...errors };
  }

  getControlErrors(form: FormGroup): ValidationErrors {
    // Get a list of all the control names
    const formControls = Object.keys(form.controls);
    /*
     * Iterate over them, each time checking if it is a form control or group
     * if it is a group, then recursively collect the errors
     */
    return formControls.reduce((errors, controlName) => {
      const control = form.controls[controlName];

      if (this.isControlAFormGroup(control)) {
        // A form group may have a top level for error
        if (this.controlHasErrors(control)) {
          errors[controlName] = control.errors as ValidationErrors;
        }

        return {
          ...errors,
          ...this.getControlErrors(control as FormGroup),
        };
      } else {
        // it is a control
        if (this.controlHasErrors(control)) {
          errors[controlName] = control.errors as ValidationErrors;
        }
        return errors;
      }
    }, {} as ValidationErrors);
  }

  isControlAFormGroup(control: AbstractControl | FormGroup): boolean {
    return (control as FormGroup).controls !== undefined;
  }

  controlHasErrors(control: AbstractControl | FormGroup): boolean {
    return control.errors !== null;
  }
}
