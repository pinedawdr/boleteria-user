import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from '../../../core/models/evento.model';
import { EventosService } from '../../../core/services/eventos.service';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.scss']
})
export class EventosListComponent implements OnInit {
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  categorias = [
    { id: 1, nombre: 'Conciertos' },
    { id: 2, nombre: 'Deportes' },
    { id: 3, nombre: 'Teatro' },
    { id: 4, nombre: 'Cine' },
    { id: 5, nombre: 'Festivales' },
    { id: 6, nombre: 'Conferencias' }
  ];
  
  loading = true;
  error = false;
  
  // Filtros
  categoriaSeleccionada: number | null = null;
  fechaSeleccionada: string | null = null;
  ordenActual: string = 'fecha_asc';
  
  // Paginación
  pageSize = 12;
  pageIndex = 0;
  totalEvents = 0;
  
  // Búsqueda
  searchControl = new FormControl('');

  constructor(
    private eventosService: EventosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.loading = true;
    this.eventosService.getEventos().subscribe(
      (eventos) => {
        this.eventos = eventos;
        this.aplicarFiltros();
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
        this.loading = false;
        this.error = true;
        this.eventos = this.getMockEventos();
        this.aplicarFiltros();
      }
    );
  }

  aplicarFiltros(): void {
    let resultados = [...this.eventos];
    
    // Aplicar filtro de categoría
    if (this.categoriaSeleccionada !== null) {
      resultados = resultados.filter(e => 
        e.categoria_id === this.categoriaSeleccionada || 
        e.categoriaId === this.categoriaSeleccionada);
    }
    
    // Aplicar filtro de fecha
    if (this.fechaSeleccionada) {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      const finSemana = new Date(hoy);
      finSemana.setDate(hoy.getDate() + (7 - hoy.getDay()));
      
      const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
      
      switch (this.fechaSeleccionada) {
        case 'hoy':
          resultados = resultados.filter(e => {
            const fechaEvento = new Date(e.fecha);
            fechaEvento.setHours(0, 0, 0, 0);
            return fechaEvento.getTime() === hoy.getTime();
          });
          break;
        case 'esta-semana':
          resultados = resultados.filter(e => {
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= hoy && fechaEvento <= finSemana;
          });
          break;
        case 'este-mes':
          resultados = resultados.filter(e => {
            const fechaEvento = new Date(e.fecha);
            return fechaEvento >= hoy && fechaEvento <= finMes;
          });
          break;
      }
    }
    
    // Aplicar ordenamiento
    resultados = this.eventosService.ordenarEventos(resultados, this.ordenActual);
    
    // Asignar a la lista filtrada
    this.eventosFiltrados = resultados;
    this.totalEvents = resultados.length;
  }

  filtrarPorCategoria(categoriaId: number | null): void {
    this.categoriaSeleccionada = categoriaId;
    this.aplicarFiltros();
  }

  filtrarPorFecha(tipo: string): void {
    this.fechaSeleccionada = tipo === 'todas' ? null : tipo;
    this.aplicarFiltros();
  }

  ordenar(criterio: string): void {
    this.ordenActual = criterio;
    this.aplicarFiltros();
  }

  resetFiltros(): void {
    this.categoriaSeleccionada = null;
    this.fechaSeleccionada = null;
    this.ordenActual = 'fecha_asc';
    this.aplicarFiltros();
  }

  verEvento(id: number): void {
    this.router.navigate(['/eventos', id]);
  }

  getCategoryName(id: number | string | null): string {
    if (id === null) return 'Todas';
    
    // Convertir a número si es string
    const catId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const categoria = this.categorias.find(c => c.id === catId);
    return categoria ? categoria.nombre : 'Desconocida';
  }

  getFechaLabel(tipo: string | null): string {
    if (!tipo) return 'Todas las fechas';
    
    switch (tipo) {
      case 'hoy': return 'Hoy';
      case 'esta-semana': return 'Esta semana';
      case 'este-mes': return 'Este mes';
      default: return 'Todas las fechas';
    }
  }

  // Mock data en caso de error de carga
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
        categoriaId: 1,
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
        categoriaId: 2,
        categoria_id: 2,
        imagen: 'assets/images/soccer.jpg',
        imagen_url: 'assets/images/soccer.jpg'
      },
      {
        id: 3,
        titulo: 'Obra de Teatro: El Fantasma de la Ópera',
        nombre: 'Obra de Teatro: El Fantasma de la Ópera',
        descripcion: 'Espectáculo internacional',
        fecha: new Date('2023-11-25'),
        ubicacion: 'Teatro Peruano Japonés, Lima',
        precio: 120,
        categoriaId: 3,
        categoria_id: 3,
        imagen: 'assets/images/theater.jpg',
        imagen_url: 'assets/images/theater.jpg'
      },
      {
        id: 4,
        titulo: 'Festival de Cine de Lima',
        nombre: 'Festival de Cine de Lima',
        descripcion: 'Proyección de películas internacionales',
        fecha: new Date('2023-11-30'),
        ubicacion: 'Centro Cultural PUCP, Lima',
        precio: 30,
        categoriaId: 4,
        categoria_id: 4,
        imagen: 'assets/images/film-festival.jpg',
        imagen_url: 'assets/images/film-festival.jpg'
      },
      {
        id: 5,
        titulo: 'Festival Gastronómico Mistura',
        nombre: 'Festival Gastronómico Mistura',
        descripcion: 'La mejor gastronomía peruana',
        fecha: new Date('2023-12-05'),
        ubicacion: 'Costa Verde, Lima',
        precio: 40,
        categoriaId: 5,
        categoria_id: 5,
        imagen: 'assets/images/food-festival.jpg',
        imagen_url: 'assets/images/food-festival.jpg'
      },
      {
        id: 6,
        titulo: 'Expo Tecnología 2023',
        nombre: 'Expo Tecnología 2023',
        descripcion: 'Las últimas tendencias en tecnología',
        fecha: new Date('2023-12-10'),
        ubicacion: 'Centro de Exposiciones Jockey, Lima',
        precio: 25,
        categoriaId: 6,
        categoria_id: 6,
        imagen: 'assets/images/tech-expo.jpg',
        imagen_url: 'assets/images/tech-expo.jpg'
      }
    ];
  }
} 