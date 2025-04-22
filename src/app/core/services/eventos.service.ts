import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private mockDelay = 1000; // milisegundos

  constructor(private supabase: SupabaseService) { }

  getEventos(page: number = 1, limit: number = 10): Observable<Evento[]> {
    const query = this.supabase.client
      .from('eventos')
      .select('*')
      .range((page - 1) * limit, page * limit - 1);
    
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.procesarEventos(data || []);
      })
    );
  }

  getEventosDestacados(): Observable<Evento[]> {
    // En un entorno real, esto vendría de una API o base de datos
    // Por ahora, usaremos mocks
    return of(this.getMockEventos()).pipe(delay(this.mockDelay));
  }

  getEventosPorCategoria(categoriaId: number): Observable<Evento[]> {
    const query = this.supabase.client
      .from('eventos')
      .select('*')
      .eq('categoria_id', categoriaId);
    
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.procesarEventos(data || []);
      })
    );
  }

  getEventoPorId(id: number): Observable<Evento> {
    const query = this.supabase.client
      .from('eventos')
      .select('*')
      .eq('id', id)
      .single();
    
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.procesarEvento(data);
      })
    );
  }

  buscarEventos(termino: string): Observable<Evento[]> {
    if (!termino.trim()) {
      return this.getEventos();
    }
    
    const terminoLower = termino.toLowerCase();
    const eventos = this.getMockEventos();
    
    const resultados = eventos.filter(e => {
      const titulo = e.titulo || '';
      const descripcion = e.descripcion || '';
      const ubicacion = e.ubicacion || '';
      
      return titulo.toLowerCase().includes(terminoLower) ||
             descripcion.toLowerCase().includes(terminoLower) ||
             ubicacion.toLowerCase().includes(terminoLower);
    });
    
    return of(resultados).pipe(delay(this.mockDelay));
  }

  ordenarEventos(eventos: Evento[], criterio: string): Evento[] {
    switch (criterio) {
      case 'fecha_asc':
        return [...eventos].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      case 'fecha_desc':
        return [...eventos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      case 'precio_asc':
        return [...eventos].sort((a, b) => a.precio - b.precio);
      case 'precio_desc':
        return [...eventos].sort((a, b) => b.precio - a.precio);
      case 'nombre_asc':
        return [...eventos].sort((a, b) => {
          const tituloA = a.titulo || a.nombre || '';
          const tituloB = b.titulo || b.nombre || '';
          return tituloA.localeCompare(tituloB);
        });
      case 'nombre_desc':
        return [...eventos].sort((a, b) => {
          const tituloA = a.titulo || a.nombre || '';
          const tituloB = b.titulo || b.nombre || '';
          return tituloB.localeCompare(tituloA);
        });
      default:
        return eventos;
    }
  }

  private procesarEventos(data: any[]): Evento[] {
    return data.map(item => this.procesarEvento(item));
  }

  private procesarEvento(data: any): Evento {
    return {
      id: data.id,
      titulo: data.titulo,
      nombre: data.titulo || data.nombre || 'Evento sin nombre', // Asignamos el título como nombre para compatibilidad
      descripcion: data.descripcion,
      fecha: new Date(data.fecha),
      ubicacion: data.ubicacion || 'Sin ubicación',
      precio: data.precio || 0,
      precio_desde: data.precio_desde || data.precio || 0,
      categoriaId: data.categoria_id || 1,
      categoria_id: data.categoria_id || 1,
      imagen: data.imagen || 'assets/images/event-placeholder.jpg',
      imagen_url: data.imagen_url || data.imagen || 'assets/images/event-placeholder.jpg'
    };
  }

  // Mock data para desarrollo
  getMockEventos(): Evento[] {
    return [
      {
        id: 1,
        titulo: 'Concierto de Rock en Lima',
        nombre: 'Concierto de Rock en Lima',
        descripcion: 'El mejor concierto de rock del año',
        fecha: new Date('2023-12-15'),
        ubicacion: 'Estadio Nacional, Lima',
        precio: 150,
        precio_desde: 150,
        categoriaId: 'conciertos',
        categoria_id: 1,
        imagen: 'assets/images/concert.jpg',
        imagen_url: 'assets/images/concert.jpg'
      },
      {
        id: 2,
        titulo: 'Partido de Fútbol - Perú vs Chile',
        nombre: 'Partido de Fútbol - Perú vs Chile',
        descripcion: 'Partido clasificatorio',
        fecha: new Date('2023-11-20'),
        ubicacion: 'Estadio Nacional, Lima',
        precio: 80,
        precio_desde: 80,
        categoriaId: 'deportes',
        categoria_id: 2,
        imagen: 'assets/images/soccer.jpg',
        imagen_url: 'assets/images/soccer.jpg'
      },
      {
        id: 3,
        titulo: 'Festival Gastronómico Mistura',
        nombre: 'Festival Gastronómico Mistura',
        descripcion: 'La mejor gastronomía peruana',
        fecha: new Date('2023-12-05'),
        ubicacion: 'Costa Verde, Lima',
        precio: 40,
        precio_desde: 40,
        categoriaId: 'festivales',
        categoria_id: 5,
        imagen: 'assets/images/food-festival.jpg',
        imagen_url: 'assets/images/food-festival.jpg'
      },
      {
        id: 4,
        titulo: 'Obra de Teatro: El Fantasma de la Ópera',
        nombre: 'Obra de Teatro: El Fantasma de la Ópera',
        descripcion: 'Espectáculo internacional',
        fecha: new Date('2023-11-25'),
        ubicacion: 'Teatro Peruano Japonés, Lima',
        precio: 120,
        precio_desde: 120,
        categoriaId: 'teatro',
        categoria_id: 3,
        imagen: 'assets/images/theater.jpg',
        imagen_url: 'assets/images/theater.jpg'
      },
      {
        id: 5,
        titulo: 'Expo Tecnología 2023',
        nombre: 'Expo Tecnología 2023',
        descripcion: 'Las últimas tendencias en tecnología',
        fecha: new Date('2023-12-10'),
        ubicacion: 'Centro de Exposiciones Jockey, Lima',
        precio: 25,
        precio_desde: 25,
        categoriaId: 'conferencias',
        categoria_id: 6,
        imagen: 'assets/images/tech-expo.jpg',
        imagen_url: 'assets/images/tech-expo.jpg'
      },
      {
        id: 6,
        titulo: 'Festival de Cine de Lima',
        nombre: 'Festival de Cine de Lima',
        descripcion: 'Proyección de películas internacionales',
        fecha: new Date('2023-11-30'),
        ubicacion: 'Centro Cultural PUCP, Lima',
        precio: 30,
        precio_desde: 30,
        categoriaId: 'cine',
        categoria_id: 4,
        imagen: 'assets/images/film-festival.jpg',
        imagen_url: 'assets/images/film-festival.jpg'
      },
      {
        id: 7,
        titulo: 'Concierto Sinfónico',
        nombre: 'Concierto Sinfónico',
        descripcion: 'Orquesta Sinfónica Nacional',
        fecha: new Date('2023-12-18'),
        ubicacion: 'Gran Teatro Nacional, Lima',
        precio: 100,
        precio_desde: 100,
        categoriaId: 'conciertos',
        categoria_id: 1,
        imagen: 'assets/images/symphony.jpg',
        imagen_url: 'assets/images/symphony.jpg'
      },
      {
        id: 8,
        titulo: 'Rally Dakar Perú 2023',
        nombre: 'Rally Dakar Perú 2023',
        descripcion: 'Competencia internacional de rally',
        fecha: new Date('2023-12-02'),
        ubicacion: 'Desierto de Ica, Perú',
        precio: 60,
        precio_desde: 60,
        categoriaId: 'deportes',
        categoria_id: 2,
        imagen: 'assets/images/rally.jpg',
        imagen_url: 'assets/images/rally.jpg'
      },
      {
        id: 9,
        titulo: 'Feria del Libro de Lima',
        nombre: 'Feria del Libro de Lima',
        descripcion: 'Exposición de libros y editoriales',
        fecha: new Date('2023-12-08'),
        ubicacion: 'Parque de los Próceres, Lima',
        precio: 10,
        precio_desde: 10,
        categoriaId: 'festivales',
        categoria_id: 5,
        imagen: 'assets/images/book-fair.jpg',
        imagen_url: 'assets/images/book-fair.jpg'
      },
      {
        id: 10,
        titulo: 'Festival de Danzas Folklóricas',
        nombre: 'Festival de Danzas Folklóricas',
        descripcion: 'Celebración de las danzas tradicionales peruanas',
        fecha: new Date('2023-12-12'),
        ubicacion: 'Plaza de Armas, Cusco',
        precio: 15,
        precio_desde: 15,
        categoriaId: 'festivales',
        categoria_id: 5,
        imagen: 'assets/images/folklore.jpg',
        imagen_url: 'assets/images/folklore.jpg'
      }
    ];
  }
} 