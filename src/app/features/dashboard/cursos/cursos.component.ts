import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../../core/services/cursos.service';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { Curso } from './models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  dataCursos: Curso[] = []; // Arreglo para almacenar cursos

  constructor(private cursosService: CursosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCursos(); // Cargar cursos al inicio
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe(data => {
      this.dataCursos = [...data]; // Asignar los cursos al dataCursos
      console.log("Cursos cargados:", this.dataCursos); // Para depuración
    });
  }

  openDialog(curso?: Curso): void {
    console.log("Abriendo diálogo", curso ? "para editar" : "para agregar");
    const dialogRef = this.dialog.open(CursosDialogComponent, {
      width: '400px',
      data: curso ? curso : null // Si existe un curso, pasar los datos
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("Resultado del diálogo:", result); // Para depuración
      if (result) {
        if (curso) {
          // Si estamos editando
          console.log("Editando curso:", result); // Para depuración
          this.cursosService.updateCursoById(curso.id, result).subscribe(() => {
            this.updateCursoInList(result, curso.id);
          });
        } else {
          // Agregando un nuevo curso
          console.log("Intentando agregar curso:", result); // Para depuración
  
          this.cursosService.addCurso(result).subscribe(addedCurso => {
            if (!addedCurso) {
              alert("El curso ya existe."); // Alerta al usuario
              console.log("No se puede agregar, el curso ya existe.");
            } else {
              // Agregar el nuevo curso directamente
              this.dataCursos.push({ ...addedCurso }); // Agregar el nuevo curso como una copia
              this.dataCursos = [...this.dataCursos]; // Forzar la detección de cambios
              console.log("Curso agregado a la tabla:", addedCurso); // Para depuración
            }
          });
        }
      }
    });
  }

  deleteCurso(id: string): void {
    // Confirmar la eliminación
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este curso?");
    
    if (confirmDelete) {
      // Si el usuario confirma la eliminación
      this.cursosService.removeCursoById(id).subscribe(() => {
        console.log("Curso eliminado:", id); // Para depuración
        this.loadCursos(); // Cargar cursos nuevamente tras eliminar
      });
    } 
  }

  updateCursoInList(updatedCurso: Curso, id: string): void {
    const index = this.dataCursos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.dataCursos[index] = { ...this.dataCursos[index], ...updatedCurso }; // Actualiza el curso
      this.dataCursos = [...this.dataCursos]; // Forzar la detección de cambios
      console.log("Curso actualizado en la lista:", updatedCurso); // Para depuración
    } else {
      console.log("No se encontró el curso para actualizar:", id); // Para depuración
    }
  }
}
