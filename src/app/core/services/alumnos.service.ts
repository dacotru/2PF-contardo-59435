import { Injectable } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { Observable, of } from 'rxjs';

let ALUMNOSBASE: Alumno[] = [
  {
    id: '63c9',
    firstName: 'Daniella',
    lastName: 'Contardo',
    createdAt: new Date(),
    email: 'danicontardo@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  constructor() {}

  getAlumnos(): Observable<Alumno[]> {
    return new Observable((observer) => {
      observer.next(ALUMNOSBASE);
      observer.complete();
    });
  }

  removeAlumnoById(id: string): Observable<Alumno[]> {
    ALUMNOSBASE = ALUMNOSBASE.filter((alumno) => alumno.id !== id);
    return of(ALUMNOSBASE);
  }

  updateAlumnoById(id: string, update: Partial<Alumno>): Observable<Alumno[]> {
    ALUMNOSBASE = ALUMNOSBASE.map((alumno) =>
      alumno.id === id ? { ...alumno, ...update } : alumno
    );

    return new Observable<Alumno[]>((observer) => {
      observer.next(ALUMNOSBASE);
      observer.complete();
    });
  }
}


