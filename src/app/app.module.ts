import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Asegúrate de importar esto
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule
import { MatDatepickerModule } from '@angular/material/datepicker'; // Importa MatDatepickerModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatFormFieldModule
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { AuthModule } from './features/auth/auth.module';
import { RouterModule } from '@angular/router'; // Importa RouterModule


@NgModule({
  declarations: [
    AppComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Asegúrate de tener esto para Angular Material
    MatDialogModule, // Añade MatDialogModule
    MatInputModule, // Añade MatInputModule
    MatSelectModule, // Añade MatSelectModule
    MatDatepickerModule, // Añade MatDatepickerModule
    MatFormFieldModule, // Añade MatFormFieldModule
    MatButtonModule,
    AuthModule,
    RouterModule // Añade MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
