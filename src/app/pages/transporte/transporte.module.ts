import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransporteRoutingModule } from './transporte-routing.module';
import { RouterModule, Routes } from '@angular/router';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // Añadido el módulo faltante

// Components
import { RutasSearchComponent } from './components/rutas-search/rutas-search.component';
import { RutaCheckoutComponent } from './components/ruta-checkout/ruta-checkout.component';
import { AsientosSelectorComponent } from './components/asientos-selector/asientos-selector.component';
import { TransporteComponent } from './transporte.component';

const routes: Routes = [
  { path: '', component: TransporteComponent }
];

@NgModule({
  declarations: [
    RutasSearchComponent,
    RutaCheckoutComponent,
    AsientosSelectorComponent,
    TransporteComponent
  ],
  imports: [
    CommonModule,
    TransporteRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    
    // Material
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatDividerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatButtonToggleModule // Añadido para resolver el error del mat-button-toggle
  ]
})
export class TransporteModule { }
