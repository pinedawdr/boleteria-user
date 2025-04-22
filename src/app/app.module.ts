import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    // Registrar solo los iconos de medios de pago como SVG
    this.registerPaymentIcons();

    // Suscribirse a eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Redirigir rutas específicas al nuevo componente de registro
        if (event.url === '/registro' || event.url === '/signup' || event.url.includes('register')) {
          this.router.navigate(['/auth/registro']);
        }
      }
    });
  }

  private registerPaymentIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'visa',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/visa.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'paypal',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/paypal.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'yape',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/yape.svg')
    );
  }
}
