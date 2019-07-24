import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {
  transform(error: { [name: string]: ValidationErrors }): any {
    const field: string = Object.keys(error)[0];
    const errors: string[] = Object.keys(error[field]);
    /**
     * educe the camelCased errors into a 'normal cased' string of errors.
     * note this adds a ',' to end of each element, then removes the comma from the last one
     */
    const errorString = errors.reduce((acc, curr, i, orig) => {
      acc += `${curr.replace(/[A-Z]/g, w => {
        // lowe case the name and and a space
        return ` ${w.toLowerCase()}`;
      })},`;

      // Check if it the last one then remove the comma
      if (orig.length === i + 1) {
        acc = acc.substr(0, acc.length - 1);
      }
      return acc;
    }, '');

    // Uppercase the field name
    const upperField: string =
      field.substr(0, 1).toUpperCase() + field.substr(1, field.length - 1);

    return `${upperField} is ${errorString}`;
  }
}
