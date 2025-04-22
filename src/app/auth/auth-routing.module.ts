import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
  // Las rutas para registro y recuperación de contraseña se implementarán después
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
