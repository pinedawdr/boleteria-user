import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContactoComponent } from './contacto/contacto.component';
import { TerminosComponent } from './terminos/terminos.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';

const routes: Routes = [
  { path: 'ayuda', component: AyudaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'privacidad', component: PrivacidadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
