import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {
  transform(error: { [name: string]: ValidationErrors }): any {
    const field: string = Object.keys(error)[0];
    const errors: string[] = Object.keys(error[field]);
    const upperField: string =
      field.substr(0, 1).toUpperCase() + field.substr(1, field.length - 1);
    // TODO -> handle multiple errors on the one controller
    return `${upperField} field is ${errors}`;
  }
}
