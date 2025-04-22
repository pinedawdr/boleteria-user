import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Ruta, Empresa, Viaje, Vehiculo, AsientoVehiculo } from '../models/transporte.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private apiUrl = environment.apiUrl;
  private mockDelay = 1000; // milisegundos

  constructor(private supabase: SupabaseService, private http: HttpClient) { }
  
  // Obtener rutas destacadas
  getRutasDestacadas(): Observable<Ruta[]> {
    if (environment.production) {
      return this.http.get<Ruta[]>(`${this.apiUrl}/transporte/rutas/destacadas`);
    }
    
    const rutas = this.getMockRutas();
    return of(rutas.slice(0, 4)).pipe(delay(this.mockDelay));
  }
  
  // Obtener todas las rutas
  getRutas(page: number = 1, limit: number = 12): Observable<Ruta[]> {
    if (environment.production) {
      return this.http.get<Ruta[]>(`${this.apiUrl}/transporte/rutas?page=${page}&limit=${limit}`);
    }
    
    return of(this.getMockRutas()).pipe(delay(this.mockDelay));
  }
  
  // Buscar rutas por término o por origen/destino
  buscarRutas(termino: string, origen?: string, destino?: string): Observable<Ruta[]> {
    if (environment.production) {
      if (origen && destino) {
        return this.http.get<Ruta[]>(`${this.apiUrl}/transporte/rutas/buscar?origen=${origen}&destino=${destino}`);
      }
      return this.http.get<Ruta[]>(`${this.apiUrl}/transporte/rutas/buscar?q=${termino}`);
    }
    
    if (!termino?.trim() && !origen && !destino) {
      return this.getRutas();
    }
    
    const rutas = this.getMockRutas();
    
    if (origen && destino) {
      const resultados = rutas.filter(r => 
        r.origen.toLowerCase().includes(origen.toLowerCase()) && 
        r.destino.toLowerCase().includes(destino.toLowerCase())
      );
      return of(resultados).pipe(delay(this.mockDelay));
    }
    
    termino = termino?.toLowerCase() || '';
    
    const resultados = rutas.filter(r => 
      r.origen.toLowerCase().includes(termino) || 
      r.destino.toLowerCase().includes(termino) ||
      r.tipo_transporte.toLowerCase().includes(termino) ||
      (r.empresa?.nombre || '').toLowerCase().includes(termino)
    );
    
    return of(resultados).pipe(delay(this.mockDelay));
  }
  
  // Obtener ruta por ID
  getRutaById(id: number): Observable<Ruta> {
    if (environment.production) {
      return this.http.get<Ruta>(`${this.apiUrl}/transporte/rutas/${id}`);
    }
    
    const rutas = this.getMockRutas();
    const ruta = rutas.find(r => r.id === id);
    
    if (!ruta) {
      throw new Error(`Ruta con id ${id} no encontrada`);
    }
    
    return of(ruta).pipe(delay(this.mockDelay));
  }
  
  // Obtener viajes disponibles para una ruta y fecha
  getViajesDisponibles(rutaId: number, fecha: string): Observable<Viaje[]> {
    if (environment.production) {
      return this.http.get<Viaje[]>(`${this.apiUrl}/transporte/rutas/${rutaId}/viajes?fecha=${fecha}`);
    }
    
    const viajes = this.getMockViajes();
    const viajesRuta = viajes.filter(v => v.ruta_id === rutaId);
    
    return of(viajesRuta).pipe(delay(this.mockDelay));
  }
  
  // Obtener viajes para una ruta sin filtro de fecha
  getViajesParaRuta(rutaId: number): Observable<Viaje[]> {
    if (environment.production) {
      return this.http.get<Viaje[]>(`${this.apiUrl}/transporte/rutas/${rutaId}/viajes`);
    }
    
    const viajes = this.getMockViajes();
    const viajesRuta = viajes.filter(v => v.ruta_id === rutaId);
    
    return of(viajesRuta).pipe(delay(this.mockDelay));
  }
  
  // Obtener un viaje por ID
  getViajePorId(id: number): Observable<Viaje> {
    if (environment.production) {
      return this.http.get<Viaje>(`${this.apiUrl}/transporte/viajes/${id}`);
    }
    
    const viajes = this.getMockViajes();
    const viaje = viajes.find(v => v.id === id);
    
    if (!viaje) {
      throw new Error(`Viaje con id ${id} no encontrado`);
    }
    
    return of(viaje).pipe(delay(this.mockDelay));
  }
  
  // Obtener asientos para un viaje específico
  getAsientosParaViaje(viajeId: number): Observable<AsientoVehiculo[]> {
    if (environment.production) {
      return this.http.get<AsientoVehiculo[]>(`${this.apiUrl}/transporte/viajes/${viajeId}/asientos`);
    }
    
    const asientos = this.getMockAsientos();
    const asientosViaje = asientos.filter(a => a.viaje_id === viajeId);
    
    return of(asientosViaje).pipe(delay(this.mockDelay));
  }
  
  // Obtener información de una empresa
  getEmpresaPorId(id: number): Observable<Empresa> {
    if (environment.production) {
      return this.http.get<Empresa>(`${this.apiUrl}/empresas/${id}`);
    }
    
    const empresas = this.getMockEmpresas();
    const empresa = empresas.find(e => e.id === id);
    
    if (!empresa) {
      throw new Error(`Empresa con id ${id} no encontrada`);
    }
    
    return of(empresa).pipe(delay(this.mockDelay));
  }

  // Filtrar rutas por tipo de transporte
  getRutasPorTipo(tipo: string): Observable<Ruta[]> {
    if (environment.production) {
      return this.http.get<Ruta[]>(`${this.apiUrl}/transporte/rutas/tipo/${tipo}`);
    }
    
    const rutas = this.getMockRutas();
    const rutasFiltradas = rutas.filter(r => r.tipo_transporte.toLowerCase() === tipo.toLowerCase());
    
    return of(rutasFiltradas).pipe(delay(this.mockDelay));
  }

  // Mock data para desarrollo
  private getMockRutas(): Ruta[] {
    return [
      {
        id: 1,
        origen: 'Lima',
        destino: 'Cusco',
        precio: 120,
        tipo_transporte: 'avion',
        duracion: 1.5,
        hora_salida: '08:00',
        hora_llegada: '09:30',
        empresa: { 
          id: 1,
          nombre: 'Peruvian Airlines', 
          logo: 'assets/images/airline.png',
          rating: 4.5
        }
      },
      {
        id: 2,
        origen: 'Lima',
        destino: 'Arequipa',
        precio: 80,
        tipo_transporte: 'bus',
        duracion: 15,
        hora_salida: '20:00',
        hora_llegada: '11:00',
        empresa: { 
          id: 2,
          nombre: 'Cruz del Sur', 
          logo: 'assets/images/bus.png',
          rating: 4.2
        }
      },
      {
        id: 3,
        origen: 'Cusco',
        destino: 'Machu Picchu',
        precio: 70,
        tipo_transporte: 'tren',
        duracion: 3.5,
        hora_salida: '07:00',
        hora_llegada: '10:30',
        empresa: { 
          id: 3,
          nombre: 'PeruRail', 
          logo: 'assets/images/train.png',
          rating: 4.7
        }
      },
      {
        id: 4,
        origen: 'Lima',
        destino: 'Ica',
        precio: 50,
        tipo_transporte: 'bus',
        duracion: 4,
        hora_salida: '09:00',
        hora_llegada: '13:00',
        empresa: { 
          id: 2,
          nombre: 'Oltursa', 
          logo: 'assets/images/bus.png',
          rating: 4.0
        }
      },
      {
        id: 5,
        origen: 'Lima',
        destino: 'Trujillo',
        precio: 65,
        tipo_transporte: 'bus',
        duracion: 8,
        hora_salida: '22:00',
        hora_llegada: '06:00',
        empresa: { 
          id: 4,
          nombre: 'Movil Tours', 
          logo: 'assets/images/bus.png',
          rating: 3.8
        }
      },
      {
        id: 6,
        origen: 'Lima',
        destino: 'Piura',
        precio: 140,
        tipo_transporte: 'avion',
        duracion: 1.5,
        hora_salida: '15:30',
        hora_llegada: '17:00',
        empresa: { 
          id: 5,
          nombre: 'LATAM', 
          logo: 'assets/images/airline.png',
          rating: 4.1
        }
      },
      {
        id: 7,
        origen: 'Arequipa',
        destino: 'Puno',
        precio: 45,
        tipo_transporte: 'bus',
        duracion: 5,
        hora_salida: '08:30',
        hora_llegada: '13:30',
        empresa: { 
          id: 2,
          nombre: 'Cruz del Sur', 
          logo: 'assets/images/bus.png',
          rating: 4.2
        }
      },
      {
        id: 8,
        origen: 'Lima',
        destino: 'Huaraz',
        precio: 55,
        tipo_transporte: 'bus',
        duracion: 7,
        hora_salida: '21:00',
        hora_llegada: '04:00',
        empresa: { 
          id: 6,
          nombre: 'Civa', 
          logo: 'assets/images/bus.png',
          rating: 3.5
        }
      }
    ];
  }

  private getMockViajes(): Viaje[] {
    return [
      {
        id: 1,
        ruta_id: 1,
        fecha_salida: '2023-11-20',
        hora_salida: '08:00',
        fecha_llegada: '2023-11-20',
        hora_llegada: '09:30',
        precio_base: 120,
        vehiculo_id: 1,
        plazas_disponibles: 45,
        plazas_totales: 120,
        estado: 'programado'
      },
      {
        id: 2,
        ruta_id: 1,
        fecha_salida: '2023-11-21',
        hora_salida: '10:30',
        fecha_llegada: '2023-11-21',
        hora_llegada: '12:00',
        precio_base: 130,
        vehiculo_id: 2,
        plazas_disponibles: 80,
        plazas_totales: 120,
        estado: 'programado'
      },
      {
        id: 3,
        ruta_id: 2,
        fecha_salida: '2023-11-20',
        hora_salida: '20:00',
        fecha_llegada: '2023-11-21',
        hora_llegada: '11:00',
        precio_base: 80,
        vehiculo_id: 3,
        plazas_disponibles: 28,
        plazas_totales: 40,
        estado: 'programado'
      },
      {
        id: 4,
        ruta_id: 3,
        fecha_salida: '2023-11-20',
        hora_salida: '07:00',
        fecha_llegada: '2023-11-20',
        hora_llegada: '10:30',
        precio_base: 70,
        vehiculo_id: 4,
        plazas_disponibles: 15,
        plazas_totales: 60,
        estado: 'programado'
      }
    ];
  }

  private getMockEmpresas(): Empresa[] {
    return [
      {
        id: 1,
        nombre: 'Peruvian Airlines',
        logo: 'assets/images/airline.png',
        rating: 4.5
      },
      {
        id: 2,
        nombre: 'Cruz del Sur',
        logo: 'assets/images/bus.png',
        rating: 4.2
      },
      {
        id: 3,
        nombre: 'PeruRail',
        logo: 'assets/images/train.png',
        rating: 4.7
      },
      {
        id: 4,
        nombre: 'Movil Tours',
        logo: 'assets/images/bus.png',
        rating: 3.8
      },
      {
        id: 5,
        nombre: 'LATAM',
        logo: 'assets/images/airline.png',
        rating: 4.1
      },
      {
        id: 6,
        nombre: 'Civa',
        logo: 'assets/images/bus.png',
        rating: 3.5
      }
    ];
  }

  private getMockAsientos(): AsientoVehiculo[] {
    // Asientos para el viaje ID 3 (Lima a Arequipa en bus)
    const asientosBus: AsientoVehiculo[] = [];
    
    // Crear asientos
    for (let i = 1; i <= 40; i++) {
      const tipo = i <= 10 ? 'vip' as const : (i <= 30 ? 'semicama' as const : 'normal' as const);
      const precio = tipo === 'vip' ? 100 : (tipo === 'semicama' ? 80 : 60);
      const estado = i % 5 === 0 ? 'vendido' as const : (i % 7 === 0 ? 'reservado' as const : 'disponible' as const);
      
      // Determinar fila y columna para coordenadas
      const fila = Math.ceil(i / 4); // 4 asientos por fila
      let columna = i % 4;
      if (columna === 0) columna = 4;
      
      // Coordenadas para visualizacion gráfica
      const coordenada_x = columna <= 2 ? columna : columna + 1; // Pasillo después de columna 2
      const coordenada_y = fila;
      
      asientosBus.push({
        id: i,
        vehiculo_id: 3,
        viaje_id: 3,
        nombre: `${columna === 1 ? 'A' : columna === 2 ? 'B' : columna === 3 ? 'C' : 'D'}${fila}`,
        tipo,
        precio,
        estado,
        coordenada_x,
        coordenada_y
      });
    }
    
    return asientosBus;
  }
} 