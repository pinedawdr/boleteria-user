import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

import { PerfilRoutingModule } from './perfil-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule
  ]
})
export class PerfilModule { }
