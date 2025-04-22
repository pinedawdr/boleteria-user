import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private _client: SupabaseClient;

  constructor() {
    this._client = createClient(
      environment.supabase.url,
      environment.supabase.publicKey
    );
  }

  get client(): SupabaseClient {
    return this._client;
  }

  // Métodos de autenticación
  signUp(email: string, password: string): Observable<any> {
    return from(this.client.auth.signUp({ email, password })).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
      catchError(error => {
        console.error('Error en signup:', error);
        return throwError(() => error);
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.client.auth.signInWithPassword({ email, password })).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
      catchError(error => {
        console.error('Error en signin:', error);
        return throwError(() => error);
      })
    );
  }

  signOut(): Observable<any> {
    return from(this.client.auth.signOut()).pipe(
      map(({ error }) => {
        if (error) throw error;
        return true;
      }),
      catchError(error => {
        console.error('Error en signout:', error);
        return throwError(() => error);
      })
    );
  }

  resetPassword(email: string): Observable<any> {
    return from(this.client.auth.resetPasswordForEmail(email)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
      catchError(error => {
        console.error('Error en reset password:', error);
        return throwError(() => error);
      })
    );
  }

  getSession(): Observable<any> {
    return from(this.client.auth.getSession()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
      catchError(error => {
        console.error('Error obteniendo sesión:', error);
        return throwError(() => error);
      })
    );
  }

  // Método para subir imagen a storage
  uploadImage(bucket: string, path: string, file: File): Observable<string> {
    return from(this.client.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: true
    })).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const imageUrl = this.client.storage
          .from(bucket)
          .getPublicUrl(data.path).data.publicUrl;
          
        return imageUrl;
      }),
      catchError(error => {
        console.error('Error subiendo imagen:', error);
        return throwError(() => error);
      })
    );
  }

  // Método para eliminar imagen del storage
  deleteImage(bucket: string, path: string): Observable<boolean> {
    return from(this.client.storage.from(bucket).remove([path])).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return true;
      }),
      catchError(error => {
        console.error('Error eliminando imagen:', error);
        return throwError(() => error);
      })
    );
  }
} 