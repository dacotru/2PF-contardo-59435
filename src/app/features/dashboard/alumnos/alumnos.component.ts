import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { Alumno } from './models';
import { AlumnoService } from '../../../core/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})

export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: Alumno[] = [];  // Lista de alumnos

  isLoading = false;  // Indicador de carga

  constructor(
    private matDialog: MatDialog,
    private alumnosService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.loadUsers();  // Cargar los alumnos al iniciar el componente
  }

  loadUsers(): void {
    this.isLoading = true;
    this.alumnosService.getAlumnos().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openModal(alumno?: Alumno): void {
    const dialogRef = this.matDialog.open(AlumnosDialogComponent, {
      data: { editingUser: alumno },  // Se pasa el alumno completo, incluyendo la fecha de creación
    });
  
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          if (alumno) {
            // Editar alumno
            const index = this.dataSource.findIndex(a => a.id === alumno.id);
            if (index > -1) {
              this.dataSource[index] = result;
            }
          } else {
            // Crear nuevo alumno
            this.dataSource.push(result);
          }
  
          this.dataSource = [...this.dataSource];  // Forzar la detección de cambios
        }
      },
    });
  }
  
  // Función para eliminar un alumno por su ID
  onDelete(id: string): void {
    if (confirm('¿Estás seguro que quieres eliminar este alumno?')) {
      this.isLoading = true;
      this.alumnosService.removeAlumnoById(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(alumno => alumno.id !== id);
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
