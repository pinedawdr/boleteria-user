import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // autorizado, devolver true
      return true;
    }
    
    // no está logueado, redirigir a la página de login con la URL de retorno
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}