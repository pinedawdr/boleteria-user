import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = environment.apiUrl || 'https://api.example.com'; // Reemplazar con tu URL real

  constructor(private http: HttpClient) { }

  /**
   * Realiza una búsqueda de eventos y viajes
   * @param query Texto a buscar
   * @returns Observable con los resultados de la búsqueda
   */
  searchEventosYViajes(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }

    const url = `${this.apiUrl}/search?q=${encodeURIComponent(query)}`;
    
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Error en la búsqueda:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene sugerencias para el autocompletado mientras se escribe
   * @param query Texto parcial para sugerencias
   * @returns Observable con sugerencias de búsqueda
   */
  getSuggestions(query: string): Observable<string[]> {
    if (!query.trim() || query.length < 2) {
      return of([]);
    }

    const url = `${this.apiUrl}/suggestions?q=${encodeURIComponent(query)}`;
    
    return this.http.get<string[]>(url).pipe(
      catchError(error => {
        console.error('Error al obtener sugerencias:', error);
        return of([]);
      })
    );
  }
}
