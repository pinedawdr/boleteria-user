import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.supabaseService.currentUser$.pipe(
      take(1),
      map(user => {
        const isLoggedIn = !!user;
        
        if (!isLoggedIn) {
          // Redireccionar al login si no hay sesión
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          });
          return false;
        }
        
        return true;
      })
    );
  }
} 