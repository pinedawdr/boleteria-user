import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../core/services/evento.service';
import { TransporteService } from '../../core/services/transporte.service';
import { Evento } from '../../core/models/evento.model';
import { Ruta } from '../../core/models/transporte.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  featuredEvents: Evento[] = [];
  featuredRoutes: Ruta[] = [];
  loadingEvents = false;
  loadingRoutes = false;
  
  // Categorías de eventos
  eventCategories = [
    { id: 'conciertos', name: 'Conciertos', icon: 'music_note' },
    { id: 'deportes', name: 'Deportes', icon: 'sports_soccer' },
    { id: 'teatro', name: 'Teatro', icon: 'theater_comedy' },
    { id: 'festivales', name: 'Festivales', icon: 'celebration' }
  ];
  
  // Tipos de transporte
  transportTypes = [
    { id: 'bus', name: 'Bus', icon: 'directions_bus', description: 'Viajes interprovinciales en bus' },
    { id: 'avion', name: 'Avión', icon: 'flight', description: 'Vuelos nacionales' },
    { id: 'tren', name: 'Tren', icon: 'train', description: 'Recorridos panorámicos' },
    { id: 'taxi', name: 'Taxi', icon: 'local_taxi', description: 'Traslados privados' }
  ];

  constructor(
    private eventoService: EventoService,
    private transporteService: TransporteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFeaturedEvents();
    this.loadFeaturedRoutes();
  }

  loadFeaturedEvents(): void {
    this.loadingEvents = true;
    this.eventoService.getFeaturedEvents()
      .pipe(
        finalize(() => {
          this.loadingEvents = false;
        })
      )
      .subscribe({
        next: (events) => {
          this.featuredEvents = events;
        },
        error: (error) => {
          console.error('Error loading featured events', error);
          // Datos de muestra en caso de error
          this.featuredEvents = this.getMockEvents();
        }
      });
  }

  loadFeaturedRoutes(): void {
    this.loadingRoutes = true;
    this.transporteService.getRutasDestacadas()
      .pipe(
        finalize(() => {
          this.loadingRoutes = false;
        })
      )
      .subscribe({
        next: (routes) => {
          this.featuredRoutes = routes;
        },
        error: (error) => {
          console.error('Error loading featured routes', error);
          // Datos de muestra en caso de error
          this.featuredRoutes = this.getMockRoutes();
        }
      });
  }

  navigateToEvent(id: number): void {
    this.router.navigate(['/eventos', id]);
  }

  navigateToCategory(categoryId: string): void {
    this.router.navigate(['/eventos'], { queryParams: { category: categoryId } });
  }

  navigateToRoute(id: number): void {
    this.router.navigate(['/transporte/rutas', id]);
  }

  navigateToTransportType(type: string): void {
    this.router.navigate(['/transporte/rutas'], { queryParams: { tipo: type } });
  }

  getTransportIcon(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'bus':
        return 'directions_bus';
      case 'avion':
        return 'flight';
      case 'tren':
        return 'train';
      case 'taxi':
        return 'local_taxi';
      default:
        return 'directions_bus';
    }
  }

  getTransportLabel(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'bus':
        return 'Bus';
      case 'avion':
        return 'Avión';
      case 'tren':
        return 'Tren';
      case 'taxi':
        return 'Taxi';
      default:
        return 'Bus';
    }
  }

  getDay(date: Date | string): string {
    if (!date) return '01';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.getDate().toString().padStart(2, '0');
  }

  getMonth(date: Date | string): string {
    if (!date) return 'ENE';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return months[dateObj.getMonth()];
  }

  // Datos de muestra para eventos
  private getMockEvents(): Evento[] {
    return [
      {
        id: 1,
        titulo: 'Concierto de Rock en Lima',
        nombre: 'Concierto de Rock en Lima',
        precio: 150,
        fecha: new Date('2023-12-15'),
        ubicacion: 'Estadio Nacional, Lima',
        imagen: 'assets/images/concert.jpg',
        imagen_url: 'assets/images/concert.jpg',
        categoriaId: 'conciertos',
        categoria_id: 1,
        descripcion: 'El mejor concierto de rock del año con bandas internacionales'
      },
      {
        id: 2,
        titulo: 'Clásico del Fútbol Peruano',
        nombre: 'Clásico del Fútbol Peruano',
        precio: 80,
        fecha: new Date('2023-11-20'),
        ubicacion: 'Estadio Monumental, Lima',
        imagen: 'assets/images/soccer.jpg',
        imagen_url: 'assets/images/soccer.jpg',
        categoriaId: 'deportes',
        categoria_id: 2,
        descripcion: 'El partido más esperado del año en el fútbol peruano'
      },
      {
        id: 3,
        titulo: 'Festival Gastronómico',
        nombre: 'Festival Gastronómico',
        precio: 50,
        fecha: new Date('2023-12-05'),
        ubicacion: 'Parque de la Exposición, Lima',
        imagen: 'assets/images/food-festival.jpg',
        imagen_url: 'assets/images/food-festival.jpg',
        categoriaId: 'festivales',
        categoria_id: 5,
        descripcion: 'Descubre lo mejor de la gastronomía peruana e internacional'
      },
      {
        id: 4,
        titulo: 'Romeo y Julieta: Teatro Clásico',
        nombre: 'Romeo y Julieta: Teatro Clásico',
        precio: 100,
        fecha: new Date('2023-11-25'),
        ubicacion: 'Teatro Municipal, Lima',
        imagen: 'assets/images/theater.jpg',
        imagen_url: 'assets/images/theater.jpg',
        categoriaId: 'teatro',
        categoria_id: 3,
        descripcion: 'La obra clásica de Shakespeare interpretada por artistas de primer nivel'
      }
    ];
  }

  // Datos de muestra para rutas
  private getMockRoutes(): Ruta[] {
    return [
      {
        id: 1,
        origen: 'Lima',
        destino: 'Cusco',
        precio: 120,
        duracion: 1.5,
        tipo_transporte: 'avion',
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
        duracion: 15,
        tipo_transporte: 'bus',
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
        duracion: 3.5,
        tipo_transporte: 'tren',
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
        duracion: 4,
        tipo_transporte: 'bus',
        hora_salida: '09:00',
        hora_llegada: '13:00',
        empresa: { 
          id: 4,
          nombre: 'Oltursa', 
          logo: 'assets/images/bus.png',
          rating: 4.0
        }
      }
    ];
  }
}
