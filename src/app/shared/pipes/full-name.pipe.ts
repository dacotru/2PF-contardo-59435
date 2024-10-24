import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';

@Pipe({
  name: 'FullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: Alumno, transform?: 'uppercase'): string {
    const result = value.firstName + ' ' + value.lastName;

    if (transform === 'uppercase') {
      return `${result}`.toUpperCase();
    }

    return result;
  }
}
