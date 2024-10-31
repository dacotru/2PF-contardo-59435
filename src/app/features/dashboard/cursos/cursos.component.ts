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
  dataCursos: Curso[] = [];

  constructor(private cursosService: CursosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe(data => {
      this.dataCursos = [...data]; 
    });
  }

  openDialog(curso?: Curso): void {
    console.log("Abriendo diálogo", curso ? "para editar" : "para agregar");
    const dialogRef = this.dialog.open(CursosDialogComponent, {
      width: '400px',
      data: curso ? curso : null 
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (curso) {
          console.log("Editando curso:", result);
          this.cursosService.updateCursoById(curso.id, result).subscribe(() => {
            this.updateCursoInList(result, curso.id);
          });
        } else {
  
          this.cursosService.addCurso(result).subscribe(addedCurso => {
            if (!addedCurso) {
              alert("El curso ya existe.");
            } else {
              this.dataCursos.push({ ...addedCurso });
              this.dataCursos = [...this.dataCursos];
            }
          });
        }
      }
    });
  }

  deleteCurso(id: string): void {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este curso?");
    
    if (confirmDelete) {
      this.cursosService.removeCursoById(id).subscribe(() => {
        this.loadCursos();
      });
    } 
  }

  updateCursoInList(updatedCurso: Curso, id: string): void {
    const index = this.dataCursos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.dataCursos[index] = { ...this.dataCursos[index], ...updatedCurso }; 
      this.dataCursos = [...this.dataCursos];
    } 
  }
}
