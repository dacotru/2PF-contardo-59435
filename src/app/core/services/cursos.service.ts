import { Injectable } from '@angular/core';
import { Curso } from '../../features/dashboard/cursos/models';
import { Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils'; 

let CURSOSBASE: Curso[] = [
  {
    id: '63c9',
    nombre: 'Curso de Angular',
    modalidad: 'Online',
    profesor: 'Profesor A',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor() {}

  getCursos(): Observable<Curso[]> {
    return of(CURSOSBASE);
  }

  removeCursoById(id: string): Observable<Curso[]> {
    CURSOSBASE = CURSOSBASE.filter(curso => curso.id !== id);
    return of(CURSOSBASE);
  }

  addCurso(newCurso: Curso): Observable<Curso | null> {

    newCurso.id = generateRandomString(4);
    
    const existingCurso = CURSOSBASE.find(curso => 
      curso.nombre === newCurso.nombre && 
      curso.modalidad === newCurso.modalidad && 
      curso.profesor === newCurso.profesor
    );
    
    if (existingCurso) {
      console.log("El curso ya existe:", existingCurso);
      return of(null); 
    }
    
    CURSOSBASE.push({ ...newCurso });
    return of({ ...newCurso });
  }
  
  
  
  

  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso[]> {
    CURSOSBASE = CURSOSBASE.map(curso =>
      curso.id === id ? { ...curso, ...update } : curso
    );
    return of(CURSOSBASE);
  }
  
}
