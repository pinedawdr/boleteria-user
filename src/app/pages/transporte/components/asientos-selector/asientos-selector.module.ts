import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { AsientosSelectorComponent } from './asientos-selector.component';

const routes: Routes = [
  {
    path: '',
    component: AsientosSelectorComponent
  }
];

@NgModule({
  declarations: [
    AsientosSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    
    // Material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDividerModule
  ]
})
export class AsientosSelectorModule { } 