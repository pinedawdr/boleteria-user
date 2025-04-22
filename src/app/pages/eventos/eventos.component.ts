import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  events = [
    {
      id: 1,
      title: 'Festival de Música Electrónica Lima 2023',
      category: 'Concierto',
      date: new Date('2023-11-26'),
      time: '18:00 - 04:00',
      location: 'Estadio Nacional, Lima',
      price: '180.00',
      imageUrl: 'assets/images/events/event-1.webp'
    },
    {
      id: 2,
      title: 'Bad Bunny - World\'s Hottest Tour',
      category: 'Concierto',
      date: new Date('2023-12-15'),
      time: '20:00 - 23:00',
      location: 'Estadio Nacional, Lima',
      price: '250.00',
      imageUrl: 'assets/images/events/event-2.webp'
    },
    {
      id: 3,
      title: 'Comic Con Perú 2023',
      category: 'Expo',
      date: new Date('2023-11-10'),
      time: '10:00 - 20:00',
      location: 'Centro de Convenciones, Lima',
      price: '85.00',
      imageUrl: 'assets/images/events/event-3.webp'
    },
    {
      id: 4,
      title: 'Clásico del Fútbol Peruano: Alianza vs. Universitario',
      category: 'Deportes',
      date: new Date('2023-11-19'),
      time: '15:30',
      location: 'Estadio Monumental, Lima',
      price: '120.00',
      imageUrl: 'assets/images/events/event-1.webp'
    },
    {
      id: 5,
      title: 'Obra de Teatro: Romeo y Julieta',
      category: 'Teatro',
      date: new Date('2023-12-05'),
      time: '19:00',
      location: 'Teatro Municipal, Lima',
      price: '95.00',
      imageUrl: 'assets/images/events/event-2.webp'
    },
    {
      id: 6,
      title: 'Workshop de Desarrollo Web Moderno',
      category: 'Workshop',
      date: new Date('2023-11-28'),
      time: '09:00 - 17:00',
      location: 'Centro de Convenciones, Lima',
      price: '150.00',
      imageUrl: 'assets/images/events/event-3.webp'
    }
  ];
  
  currentPage = 1;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  filterByCategory(category: string): void {
    // Implementación del filtrado por categoría
    console.log('Filtrar por categoría:', category);
  }
  
  resetFilters(): void {
    // Implementación para resetear filtros
    console.log('Resetear filtros');
  }
}
