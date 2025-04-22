import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BuscarComponent } from './buscar.component';

const routes: Routes = [
  { path: '', component: BuscarComponent }
];

@NgModule({
  declarations: [
    BuscarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule
  ]
})
export class BuscarModule { }