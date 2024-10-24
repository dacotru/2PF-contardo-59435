import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { Alumno } from '../models';

interface UserDialogData {
  editingUser?: Alumno;
}

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
  styles: ``,
})
export class AlumnosDialogComponent {
  alumnoForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<AlumnosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
  ) {
    this.alumnoForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      email: [null, [Validators.required, Validators.email]], 
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }

  patchFormValue() {
    if (this.data?.editingUser) {
      this.alumnoForm.patchValue(this.data.editingUser);
    }
  }

  onSave(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.alumnoForm.value,
        id: this.isEditing
          ? this.data!.editingUser!.id
          : generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingUser!.createdAt
          : new Date(),
      });
    }
  }
}