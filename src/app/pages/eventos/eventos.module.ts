import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { EventosComponent } from './eventos.component';

const routes: Routes = [
  { path: '', component: EventosComponent }
];

@NgModule({
  declarations: [
    EventosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class EventosModule { }
