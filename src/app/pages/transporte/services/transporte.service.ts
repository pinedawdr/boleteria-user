import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Ciudad {
  id: number;
  nombre: string;
  departamento: string;
}

export interface Ruta {
  id: number;
  origen?: string;
  destino?: string;
  empresa_id?: number;
  empresa?: string;
  tipo_transporte?: string;
  precio?: number;
}

export interface Viaje {
  id: number;
  ruta_id?: number;
  ruta?: Ruta;
  fecha_salida?: string;
  hora_salida?: string;
  hora_llegada?: string;
  duracion?: string;
  precio?: number;
  asientos_disponibles?: number;
}

export interface Asiento {
  id: number;
  nombre: string;
  estado: 'disponible' | 'ocupado' | 'seleccionado';
  tipo: 'regular' | 'premium' | 'vip';
  precio: number;
  posicion: { x: number; y: number };
}

export interface AsientoReserva {
  asiento_id: number;
  pasajero_id?: number;
  costo: number;
}

export interface PasajeroData {
  nombre: string;
  apellido: string;
  tipo_documento: string;
  documento_identidad: string;
}

export interface ReservaData {
  viaje_id: number;
  usuario_id: number;
  asientos: AsientoReserva[];
  pasajeros: PasajeroData[];
  metodo_pago: {
    tipo: string;
    datos: any;
  };
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener lista de ciudades
  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.apiUrl}/ciudades`).pipe(
      catchError(error => {
        console.error('Error obteniendo ciudades', error);
        return throwError(() => new Error('Error al cargar las ciudades. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Buscar rutas disponibles
  buscarRutas(
    origenId: number | null,
    destinoId: number | null,
    fecha: string,
    tipoTransporte: string,
    numPasajeros: number
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('fecha', fecha)
      .set('pasajeros', numPasajeros.toString());

    if (origenId) params = params.set('origen_id', origenId.toString());
    if (destinoId) params = params.set('destino_id', destinoId.toString());
    if (tipoTransporte && tipoTransporte !== 'todos') {
      params = params.set('tipo_transporte', tipoTransporte);
    }

    return this.http.get<any[]>(`${this.apiUrl}/viajes/buscar`, { params }).pipe(
      catchError(error => {
        console.error('Error buscando rutas', error);
        return throwError(() => new Error('Error al buscar rutas. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Obtener un viaje específico
  getViaje(viajeId: number): Observable<Viaje> {
    return this.http.get<Viaje>(`${this.apiUrl}/viajes/${viajeId}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo viaje ${viajeId}`, error);
        return throwError(() => new Error('Error al cargar los detalles del viaje. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Obtener disponibilidad de asientos para un viaje
  getAsientosDisponibles(viajeId: number): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/viajes/${viajeId}/asientos`).pipe(
      catchError(error => {
        console.error(`Error obteniendo asientos del viaje ${viajeId}`, error);
        return throwError(() => new Error('Error al cargar los asientos disponibles. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Verificar disponibilidad de asientos seleccionados
  verificarDisponibilidadAsientos(viajeId: number, asientosIds: number[]): Observable<boolean> {
    return this.http.post<{ disponibles: boolean }>(`${this.apiUrl}/viajes/${viajeId}/verificar-asientos`, { asientos: asientosIds }).pipe(
      map(resp => resp.disponibles),
      catchError(error => {
        console.error('Error verificando disponibilidad de asientos', error);
        return throwError(() => new Error('Error al verificar la disponibilidad de asientos. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Crear una reserva
  crearReserva(reservaData: ReservaData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservas`, reservaData).pipe(
      catchError(error => {
        console.error('Error creando reserva', error);
        return throwError(() => new Error('Error al procesar la reserva. Por favor, verifica la información e intenta nuevamente.'));
      })
    );
  }

  // Obtener información de una ruta específica
  getRuta(rutaId: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.apiUrl}/rutas/${rutaId}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo ruta ${rutaId}`, error);
        return throwError(() => new Error('Error al cargar los detalles de la ruta. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Obtener historial de viajes de un usuario
  getHistorialViajes(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${usuarioId}/viajes`).pipe(
      catchError(error => {
        console.error('Error obteniendo historial de viajes', error);
        return throwError(() => new Error('Error al cargar el historial de viajes. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Obtener detalles de una reserva
  getReserva(reservaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservas/${reservaId}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo reserva ${reservaId}`, error);
        return throwError(() => new Error('Error al cargar los detalles de la reserva. Por favor, intenta nuevamente.'));
      })
    );
  }

  // Cancelar una reserva
  cancelarReserva(reservaId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservas/${reservaId}/cancelar`, {}).pipe(
      catchError(error => {
        console.error(`Error cancelando reserva ${reservaId}`, error);
        return throwError(() => new Error('Error al cancelar la reserva. Por favor, intenta nuevamente.'));
      })
    );
  }
} 