import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserValue != null;
  }

  login(email: string, password: string): Observable<any> {
    // En un caso real, aquí se realizaría una petición HTTP al backend
    // Este es un ejemplo simulado para propósitos de demostración
    return of({
      id: 1,
      name: 'Usuario Demo',
      email: email,
      token: 'fake-jwt-token'
    }).pipe(
      map(user => {
        // almacenar detalles del usuario y token JWT en almacenamiento local
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  register(user: any): Observable<any> {
    // En un caso real, aquí se realizaría una petición HTTP al backend
    // Este es un ejemplo simulado para propósitos de demostración
    return of({
      id: 2,
      name: user.name,
      email: user.email,
      token: 'fake-jwt-token'
    }).pipe(
      map(response => {
        // almacenar detalles del usuario y token JWT en almacenamiento local
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      })
    );
  }

  resetPassword(email: string): Observable<any> {
    // En un caso real, aquí se realizaría una petición HTTP al backend
    // Este es un ejemplo simulado para propósitos de demostración
    return of({ success: true, message: 'Reset password instructions sent' });
  }

  logout(): Observable<any> {
    // eliminar usuario del almacenamiento local
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of(null);
  }
}