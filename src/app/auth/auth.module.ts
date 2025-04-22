import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule
  ]
})
export class AuthModule { }
