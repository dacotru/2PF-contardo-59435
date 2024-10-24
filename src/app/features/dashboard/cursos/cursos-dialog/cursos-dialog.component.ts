import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../models';
import { generateRandomString } from '../../../../shared/utils/'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
  styleUrls: ['./cursos-dialog.component.scss']
})
export class CursosDialogComponent {
  cursoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CursosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso | null,
    private fb: FormBuilder
  ) {
    this.cursoForm = this.fb.group({
      nombre: [data ? data.nombre : '', Validators.required],
      modalidad: [data ? data.modalidad : '', Validators.required], // Cambiado a select
      profesor: [data ? data.profesor : '', Validators.required],
    });
  }

  onSave(): void {
    if (this.cursoForm.valid) {
      const nuevoCurso: Curso = {
        ...this.cursoForm.value,
        id: this.data ? this.data.id : generateRandomString(8) // Generar ID único solo si es un nuevo curso
      };
      console.log("Cerrando diálogo con curso:", nuevoCurso); // Para depuración
      this.dialogRef.close(nuevoCurso); // Cerrar el diálogo y pasar el nuevo curso
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
