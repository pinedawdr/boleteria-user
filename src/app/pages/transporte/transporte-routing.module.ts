import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransporteComponent } from './transporte.component';

const routes: Routes = [
  { path: '', component: TransporteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporteRoutingModule { }
