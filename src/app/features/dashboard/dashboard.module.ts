import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlumnosModule } from './alumnos/alumnos.module';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CursosModule } from './cursos/cursos.module'; 
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    AlumnosModule,
    SharedModule,
    CursosModule,
    HomeModule,
    RouterModule // Asegúrate de que RouterModule esté importado
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
