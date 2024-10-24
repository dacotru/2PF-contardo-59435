import { Injectable } from '@angular/core';
import { Curso } from '../../features/dashboard/cursos/models';
import { Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils'; 

let CURSOSBASE: Curso[] = [
  {
    id: '63c9',  // Ejemplo de ID único
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
    console.log("Llamando a addCurso con el curso:", newCurso); // Para depuración
    
    // Generar un ID único
    newCurso.id = generateRandomString(4); // Asegúrate de usar la longitud que necesites
    
    // Verifica si el curso ya existe por nombre, modalidad y dictada por
    const existingCurso = CURSOSBASE.find(curso => 
      curso.nombre === newCurso.nombre && 
      curso.modalidad === newCurso.modalidad && 
      curso.profesor === newCurso.profesor
    );
    
    if (existingCurso) {
      console.log("El curso ya existe:", existingCurso);
      return of(null); // Retorna null si el curso ya existe
    }
    
    CURSOSBASE.push({ ...newCurso }); // Agregar una copia del nuevo curso
    console.log("Curso agregado:", newCurso);
    return of({ ...newCurso }); // Devuelve una copia del curso recién agregado
  }
  
  
  
  

  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso[]> {
    CURSOSBASE = CURSOSBASE.map(curso =>
      curso.id === id ? { ...curso, ...update } : curso
    );
    return of(CURSOSBASE);
  }
  
}
