import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventosListComponent
  }
  // Nota: La ruta de detalle se agregará cuando el componente correspondiente esté creado
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
