import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Evento } from '@core/models/evento.model';
import { EventosService } from '@core/services/eventos.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.scss']
})
export class EventosListComponent implements OnInit {
  // Eventos
  eventos: Evento[] = [];
  loading = true;
  error: string | null = null;
  
  // Filtros
  searchControl = new FormControl('');
  selectedCategoryId: number | null = null;
  sortBy: 'fecha' | 'precio' | 'nombre' = 'fecha';
  
  // Categorías (mock data)
  categorias = [
    { id: 1, nombre: 'Conciertos' },
    { id: 2, nombre: 'Deportes' },
    { id: 3, nombre: 'Teatro' },
    { id: 4, nombre: 'Cine' },
    { id: 5, nombre: 'Festivales' },
    { id: 6, nombre: 'Conferencias' }
  ];
  
  // Paginación
  totalEvents = 0;
  pageSize = 12;
  pageIndex = 0;
  
  constructor(
    private eventosService: EventosService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadEventos();
    
    // Configurar búsqueda con debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.pageIndex = 0; // Resetear página al buscar
        this.loadEventos();
      });
  }
  
  loadEventos(): void {
    this.loading = true;
    this.error = null;
    
    this.eventosService.getEventos(
      this.selectedCategoryId,
      this.sortBy,
      this.searchControl.value || '',
      this.pageIndex,
      this.pageSize
    ).subscribe({
      next: (response) => {
        this.eventos = response.eventos;
        this.totalEvents = response.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los eventos. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
        console.error('Error al cargar eventos:', err);
      }
    });
  }
  
  searchEventos(): void {
    this.pageIndex = 0;
    this.loadEventos();
  }
  
  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.pageIndex = 0;
    this.loadEventos();
  }
  
  onSortChange(): void {
    this.pageIndex = 0;
    this.loadEventos();
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEventos();
  }
  
  navigateToEvento(id: number): void {
    this.router.navigate(['/eventos', id]);
  }
  
  getCategoryName(categoryId: number | undefined | null): string {
    if (categoryId === undefined || categoryId === null) {
      return 'Sin categoría';
    }
    const category = this.categorias.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  }
  
  // Mock data para pruebas
  private loadMockEventos(): Evento[] {
    return [
      {
        id: 1,
        titulo: 'Concierto de Bad Bunny',
        descripcion: 'El famoso artista puertorriqueño presenta su nuevo álbum en un concierto único.',
        fecha: new Date('2023-12-15T20:00:00'),
        ubicacion: 'Estadio Nacional, San José',
        precio: 75000,
        categoriaId: 1,
        imagen: 'assets/images/eventos/concierto-1.jpg'
      },
      {
        id: 2,
        titulo: 'Final del Campeonato Nacional',
        descripcion: 'Gran final del torneo de fútbol con los mejores equipos del país.',
        fecha: new Date('2023-11-20T15:30:00'),
        ubicacion: 'Estadio Ricardo Saprissa, San José',
        precio: 15000,
        categoriaId: 2,
        imagen: 'assets/images/eventos/deporte-1.jpg'
      },
      {
        id: 3,
        titulo: 'Romeo y Julieta - Teatro Nacional',
        descripcion: 'Clásica obra de Shakespeare interpretada por el grupo teatral nacional.',
        fecha: new Date('2023-12-05T19:00:00'),
        ubicacion: 'Teatro Nacional, San José',
        precio: 25000,
        categoriaId: 3,
        imagen: 'assets/images/eventos/teatro-1.jpg'
      },
      {
        id: 4,
        titulo: 'Estreno: El Rey León',
        descripcion: 'Estreno de la nueva película de Disney en versión live action.',
        fecha: new Date('2023-11-28T18:30:00'),
        ubicacion: 'Cinemark Multiplaza Escazú, San José',
        precio: 5000,
        categoriaId: 4,
        imagen: 'assets/images/eventos/cine-1.jpg'
      },
      {
        id: 5,
        titulo: 'Festival Internacional de Jazz',
        descripcion: 'Tres días de música jazz con artistas internacionales y nacionales.',
        fecha: new Date('2024-01-20T16:00:00'),
        ubicacion: 'Parque La Sabana, San José',
        precio: 30000,
        categoriaId: 5,
        imagen: 'assets/images/eventos/festival-1.jpg'
      },
      {
        id: 6,
        titulo: 'Conferencia de Tecnología TechCR',
        descripcion: 'Conferencia sobre las últimas tendencias en tecnología y desarrollo web.',
        fecha: new Date('2023-12-10T09:00:00'),
        ubicacion: 'Centro de Convenciones, San José',
        precio: 45000,
        categoriaId: 6,
        imagen: 'assets/images/eventos/conferencia-1.jpg'
      }
    ];
  }
} 