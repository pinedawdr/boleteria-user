import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Componentes
import { HeaderComponent } from './components/header/header.component';

// Servicios - opcional, si necesitas crear servicios compartidos
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    HeaderComponent,
    // Material Modules que quieres exponer a otros módulos
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [
    SearchService // Opcional, solo si lo creas
  ]
})
export class SharedModule { }
