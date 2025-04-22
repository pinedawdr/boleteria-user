import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SupabaseService } from '../services/supabase.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  public authState$ = this.authStateSubject.asObservable();
  public user$ = this.userSubject.asObservable();

  constructor(
    private supabase: SupabaseService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // Verificar estado de autenticación al iniciar
    this.checkAuthState();
    
    // Escuchar cambios de autenticación
    this.supabase.client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        this.loadUser(session.user.id);
        this.authStateSubject.next(true);
      } else if (event === 'SIGNED_OUT') {
        this.userSubject.next(null);
        this.authStateSubject.next(false);
      }
    });
  }

  // Verificar el estado de autenticación actual
  private checkAuthState(): void {
    this.supabase.getSession().pipe(
      switchMap(session => {
        if (session?.session) {
          this.authStateSubject.next(true);
          return this.loadUser(session.session.user.id);
        } else {
          this.authStateSubject.next(false);
          return of(null);
        }
      }),
      catchError(() => {
        this.authStateSubject.next(false);
        return of(null);
      })
    ).subscribe();
  }

  // Cargar información del usuario
  private loadUser(userId: string): Observable<Usuario | null> {
    return this.usuarioService.getUserById(userId).pipe(
      tap(user => {
        this.userSubject.next(user);
      })
    );
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.supabase.signIn(email, password).pipe(
      switchMap(data => {
        if (data.user) {
          this.authStateSubject.next(true);
          return this.loadUser(data.user.id);
        }
        return of(data);
      }),
      catchError(error => throwError(() => error))
    );
  }

  // Registrar nuevo usuario
  register(email: string, password: string, userData: Partial<Usuario>): Observable<any> {
    return this.supabase.signUp(email, password).pipe(
      switchMap(data => {
        if (data.user) {
          // Crear el perfil de usuario en la tabla usuarios
          const nuevoUsuario: Partial<Usuario> = {
            id: data.user.id,
            email: email,
            ...userData,
            fecha_registro: new Date().toISOString()
          };
          
          return from(this.supabase.client
            .from('usuarios')
            .insert(nuevoUsuario)
            .select()).pipe(
              map(() => data)
            );
        }
        return of(data);
      }),
      catchError(error => throwError(() => error))
    );
  }

  // Cerrar sesión
  logout(): Observable<any> {
    return this.supabase.signOut().pipe(
      tap(() => {
        this.authStateSubject.next(false);
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => throwError(() => error))
    );
  }

  // Recuperar contraseña
  forgotPassword(email: string): Observable<any> {
    return this.supabase.resetPassword(email).pipe(
      catchError(error => throwError(() => error))
    );
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.authState$;
  }

  // Obtener el usuario actual
  getCurrentUser(): Observable<Usuario | null> {
    return this.user$;
  }
} 