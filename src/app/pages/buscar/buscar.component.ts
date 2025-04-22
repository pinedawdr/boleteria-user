import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {
  searchQuery: string = '';
  activeTab: string = 'all';
  sortOption: string = 'relevance';
  eventCategory: string = '';
  transportType: string = '';
  currentPage: number = 1;
  
  // Datos de ejemplo (en una implementación real vendrian de un servicio)
  events = [
    {
      id: 1,
      title: 'Festival de Música Electrónica Lima 2023',
      category: 'Concierto',
      date: new Date('2023-11-26'),
      time: '18:00 - 04:00',
      location: 'Estadio Nacional, Lima',
      price: 180.00,
      imageUrl: 'assets/images/events/event-1.webp'
    },
    {
      id: 2,
      title: 'Bad Bunny - World\'s Hottest Tour',
      category: 'Concierto',
      date: new Date('2023-12-15'),
      time: '20:00 - 23:00',
      location: 'Estadio Nacional, Lima',
      price: 250.00,
      imageUrl: 'assets/images/events/event-2.webp'
    },
    {
      id: 3,
      title: 'Comic Con Perú 2023',
      category: 'Expo',
      date: new Date('2023-11-10'),
      time: '10:00 - 20:00',
      location: 'Centro de Convenciones, Lima',
      price: 85.00,
      imageUrl: 'assets/images/events/event-3.webp'
    }
  ];
  
  transport = [
    {
      id: 1,
      type: 'bus',
      companyName: 'Cruz del Sur',
      companyLogo: 'assets/images/companies/cruz-del-sur.png',
      origin: 'Lima',
      destination: 'Cusco',
      departureTime: '20:00',
      arrivalTime: '16:00',
      duration: '20h',
      date: new Date('2023-11-20'),
      class: 'Ejecutivo',
      price: 180.00
    },
    {
      id: 2,
      type: 'avion',
      companyName: 'LATAM Airlines',
      companyLogo: 'assets/images/companies/latam.png',
      origin: 'Lima',
      destination: 'Cusco',
      departureTime: '09:30',
      arrivalTime: '10:50',
      duration: '1h 20m',
      date: new Date('2023-11-20'),
      class: 'Económico',
      price: 240.00
    }
  ];
  
  filteredEvents: any[] = [];
  filteredTransport: any[] = [];
  
  get resultCount(): number {
    return this.filteredEvents.length + this.filteredTransport.length;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      
      if (params['type']) {
        this.activeTab = params['type'];
      }
      
      this.applyFilters();
    });
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.updateQueryParams();
    this.applyFilters();
  }
  
  applyFilters(): void {
    // Filtrar eventos
    this.filteredEvents = this.events.filter(event => {
      let matches = true;
      
      // Filtrar por consulta de búsqueda
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        matches = matches && (
          event.title.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
        );
      }
      
      // Filtrar por categoría
      if (this.eventCategory && event.category.toLowerCase() !== this.eventCategory.toLowerCase()) {
        matches = false;
      }
      
      return matches;
    });
    
    // Ordenar eventos
    if (this.sortOption === 'price-asc') {
      this.filteredEvents.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      this.filteredEvents.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'date-asc') {
      this.filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    } else if (this.sortOption === 'date-desc') {
      this.filteredEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    
    // Si el tab activo es solo eventos, limitamos resultados a eventos
    if (this.activeTab === 'events') {
      this.filteredTransport = [];
    } else {
      // Filtrar opciones de transporte
      this.filteredTransport = this.transport.filter(option => {
        let matches = true;
        
        // Filtrar por consulta de búsqueda
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          matches = matches && (
            option.origin.toLowerCase().includes(query) ||
            option.destination.toLowerCase().includes(query) ||
            option.companyName.toLowerCase().includes(query)
          );
        }
        
        // Filtrar por tipo de transporte
        if (this.transportType && option.type !== this.transportType) {
          matches = false;
        }
        
        return matches;
      });
      
      // Ordenar transporte
      if (this.sortOption === 'price-asc') {
        this.filteredTransport.sort((a, b) => a.price - b.price);
      } else if (this.sortOption === 'price-desc') {
        this.filteredTransport.sort((a, b) => b.price - a.price);
      } else if (this.sortOption === 'date-asc') {
        this.filteredTransport.sort((a, b) => a.date.getTime() - b.date.getTime());
      } else if (this.sortOption === 'date-desc') {
        this.filteredTransport.sort((a, b) => b.date.getTime() - a.date.getTime());
      }
      
      // Si el tab activo es solo transporte, limitamos resultados a transporte
      if (this.activeTab === 'transport') {
        this.filteredEvents = [];
      }
    }
  }
  
  resetFilters(): void {
    this.sortOption = 'relevance';
    this.eventCategory = '';
    this.transportType = '';
    this.applyFilters();
  }
  
  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchQuery, type: this.activeTab },
      queryParamsHandling: 'merge'
    });
  }
}