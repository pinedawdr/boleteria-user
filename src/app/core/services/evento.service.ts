import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Evento } from '../models/evento.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = environment.apiUrl;
  private mockDelay = 1000;

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    // Si estás en producción, usa la API real
    if (environment.production) {
      return this.http.get<Evento[]>(`${this.apiUrl}/eventos`);
    }
    
    // En desarrollo, usa datos mock con un delay para simular red
    return of(this.getMockEventos()).pipe(delay(this.mockDelay));
  }

  getEventoById(id: number): Observable<Evento> {
    if (environment.production) {
      return this.http.get<Evento>(`${this.apiUrl}/eventos/${id}`);
    }
    
    const mockEventos = this.getMockEventos();
    const evento = mockEventos.find(e => e.id === id);
    
    if (!evento) {
      throw new Error(`Evento con id ${id} no encontrado`);
    }
    
    return of(evento).pipe(delay(this.mockDelay));
  }

  getFeaturedEvents(): Observable<Evento[]> {
    if (environment.production) {
      return this.http.get<Evento[]>(`${this.apiUrl}/eventos/destacados`);
    }
    
    const mockEventos = this.getMockEventos();
    const destacados = mockEventos.slice(0, 4);
    
    return of(destacados).pipe(delay(this.mockDelay));
  }

  // Filtrar eventos por término de búsqueda (título, descripción o ubicación)
  buscarEventos(termino: string): Observable<Evento[]> {
    if (!termino.trim()) {
      return this.getEventos();
    }
    
    if (environment.production) {
      return this.http.get<Evento[]>(`${this.apiUrl}/eventos/buscar?q=${termino}`);
    }
    
    const mockEventos = this.getMockEventos();
    termino = termino.toLowerCase();
    
    const resultados = mockEventos.filter(e => 
      (e.titulo || e.nombre)?.toLowerCase().includes(termino) ||
      (e.descripcion?.toLowerCase().includes(termino) || false) ||
      e.ubicacion.toLowerCase().includes(termino)
    );
    
    return of(resultados).pipe(delay(this.mockDelay));
  }

  // Filtrar eventos por categoría
  getEventosPorCategoria(categoriaId: string | number): Observable<Evento[]> {
    if (environment.production) {
      return this.http.get<Evento[]>(`${this.apiUrl}/eventos/categoria/${categoriaId}`);
    }
    
    const mockEventos = this.getMockEventos();
    const resultados = mockEventos.filter(e => 
      e.categoriaId == categoriaId || e.categoria_id == categoriaId
    );
    
    return of(resultados).pipe(delay(this.mockDelay));
  }

  // Ordenar eventos
  ordenarEventos(eventos: Evento[], criterio: string): Evento[] {
    switch (criterio) {
      case 'precio_asc':
        return [...eventos].sort((a, b) => a.precio - b.precio);
      case 'precio_desc':
        return [...eventos].sort((a, b) => b.precio - a.precio);
      case 'fecha_asc':
        return [...eventos].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      case 'fecha_desc':
        return [...eventos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      case 'nombre_asc':
        return [...eventos].sort((a, b) => (a.titulo || a.nombre).localeCompare(b.titulo || b.nombre));
      case 'nombre_desc':
        return [...eventos].sort((a, b) => (b.titulo || b.nombre).localeCompare(a.titulo || a.nombre));
      default:
        return eventos;
    }
  }

  private getMockEventos(): Evento[] {
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
        imagen: 'assets/images/folk-dance.jpg',
        imagen_url: 'assets/images/folk-dance.jpg'
      }
    ];
  }
} 