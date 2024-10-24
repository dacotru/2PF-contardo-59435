import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [CursosComponent, CursosDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CursosComponent],
})
export class CursosModule {}
