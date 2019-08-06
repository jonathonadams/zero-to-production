import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {
  transform(error: { [name: string]: ValidationErrors }): any {
    const field: string = Object.keys(error)[0];
    const errors: string[] = Object.keys(error[field]);

    let accErrors = '';

    errors.forEach(error => {
      accErrors += `${this.splitAndLowerCaseCapital(error)}, `;
    });

    accErrors = accErrors.substr(0, accErrors.length - 2);

    // Uppercase the field name
    const formField = this.upperCaseFirst(field);

    if (formField === 'Form') {
      return this.upperCaseFirst(accErrors);
    } else {
      return `${formField} is ${accErrors}`;
    }
  }

  upperCaseFirst(string: string): string {
    return (
      string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1)
    );
  }

  splitAndLowerCaseCapital(string: string): string {
    // lowe case the name and add a gap
    return string.replace(/[A-Z]/g, w => ` ${w.toLowerCase()}`);
  }
}
