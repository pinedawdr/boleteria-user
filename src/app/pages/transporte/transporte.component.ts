import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Definimos una interfaz para el objeto de transporte con tipos adicionales
interface TransportOption {
  id: number;
  type: string; // 'bus', 'avion', 'combi', 'minibus', 'bote'
  routeType: string; // 'nacional', 'regional', 'provincial', 'distrital'
  companyName: string;
  companyLogo: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: Date;
  class: string;
  price: string;
}

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.scss']
})
export class TransporteComponent implements OnInit {
  searchCriteria = {
    origin: '',
    destination: '',
    date: null,
    type: 'all',
    routeType: 'all'
  };
  
  transportOptions: TransportOption[] = [
    {
      id: 1,
      type: 'bus',
      routeType: 'nacional',
      companyName: 'Cruz del Sur',
      companyLogo: 'assets/images/companies/cruz-del-sur.png',
      origin: 'Lima',
      destination: 'Cusco',
      departureTime: '20:00',
      arrivalTime: '16:00',
      duration: '20h',
      date: new Date('2023-11-20'),
      class: 'Ejecutivo',
      price: '180.00'
    },
    {
      id: 2,
      type: 'avion',
      routeType: 'nacional',
      companyName: 'LATAM Airlines',
      companyLogo: 'assets/images/companies/latam.png',
      origin: 'Lima',
      destination: 'Cusco',
      departureTime: '09:30',
      arrivalTime: '10:50',
      duration: '1h 20m',
      date: new Date('2023-11-20'),
      class: 'Económico',
      price: '240.00'
    },
    {
      id: 3,
      type: 'avion',
      routeType: 'nacional',
      companyName: 'Sky Airline',
      companyLogo: 'assets/images/companies/sky.png',
      origin: 'Lima',
      destination: 'Cusco',
      departureTime: '14:15',
      arrivalTime: '15:35',
      duration: '1h 20m',
      date: new Date('2023-11-20'),
      class: 'Económico',
      price: '220.00'
    },
    {
      id: 4,
      type: 'bus',
      routeType: 'nacional',
      companyName: 'Oltursa',
      companyLogo: 'assets/images/companies/oltursa.png',
      origin: 'Lima',
      destination: 'Cusco',
      departureTime: '17:30',
      arrivalTime: '13:30',
      duration: '20h',
      date: new Date('2023-11-20'),
      class: 'Ejecutivo',
      price: '160.00'
    },
    // Nuevas opciones de transporte
    {
      id: 5,
      type: 'combi',
      routeType: 'regional',
      companyName: 'Transporte Regional Express',
      companyLogo: 'assets/images/companies/regional-express.png',
      origin: 'Cusco',
      destination: 'Valle Sagrado',
      departureTime: '09:00',
      arrivalTime: '10:30',
      duration: '1h 30m',
      date: new Date('2023-11-21'),
      class: 'Estándar',
      price: '25.00'
    },
    {
      id: 6,
      type: 'minibus',
      routeType: 'provincial',
      companyName: 'Turismo Andino',
      companyLogo: 'assets/images/companies/turismo-andino.png',
      origin: 'Arequipa',
      destination: 'Colca',
      departureTime: '08:00',
      arrivalTime: '11:30',
      duration: '3h 30m',
      date: new Date('2023-11-22'),
      class: 'Turístico',
      price: '45.00'
    },
    {
      id: 7,
      type: 'bote',
      routeType: 'regional',
      companyName: 'Amazonas Expeditions',
      companyLogo: 'assets/images/companies/amazonas-exp.png',
      origin: 'Iquitos',
      destination: 'Reserva Pacaya Samiria',
      departureTime: '07:00',
      arrivalTime: '12:00',
      duration: '5h',
      date: new Date('2023-11-23'),
      class: 'Turístico',
      price: '120.00'
    },
    {
      id: 8,
      type: 'combi',
      routeType: 'distrital',
      companyName: 'Lima Expreso',
      companyLogo: 'assets/images/companies/lima-express.png',
      origin: 'Lima',
      destination: 'Pachacamac',
      departureTime: '10:00',
      arrivalTime: '11:00',
      duration: '1h',
      date: new Date('2023-11-20'),
      class: 'Estándar',
      price: '10.00'
    }
  ];
  
  // Especificamos el tipo correcto para filteredTransportOptions
  filteredTransportOptions: TransportOption[] = [];
  currentPage = 1;
  
  constructor() { }

  ngOnInit(): void {
    // Inicializar la lista filtrada con todos los elementos
    this.filteredTransportOptions = [...this.transportOptions];
    
    // Aplicamos una animación de entrada para mejorar la experiencia visual
    setTimeout(() => {
      document.querySelectorAll('.transport-item').forEach((item, index) => {
        (item as HTMLElement).style.animationDelay = `${index * 0.05}s`;
      });
    }, 100);
  }
  
  filterByTransportType(type: string): void {
    this.searchCriteria.type = type;
    this.applyFilters();
  }
  
  filterByRouteType(routeType: string): void {
    this.searchCriteria.routeType = routeType;
    this.applyFilters();
  }
  
  resetFilters(): void {
    this.searchCriteria = {
      origin: '',
      destination: '',
      date: null,
      type: 'all',
      routeType: 'all'
    };
    this.filteredTransportOptions = [...this.transportOptions];
  }
  
  searchTransports(): void {
    this.applyFilters();
  }
  
  applyFilters(): void {
    this.filteredTransportOptions = this.transportOptions.filter(option => {
      // Filtrar por tipo de transporte
      if (this.searchCriteria.type !== 'all' && option.type !== this.searchCriteria.type) {
        return false;
      }
      
      // Filtrar por tipo de ruta
      if (this.searchCriteria.routeType !== 'all' && option.routeType !== this.searchCriteria.routeType) {
        return false;
      }
      
      // Filtrar por origen
      if (this.searchCriteria.origin && option.origin !== this.searchCriteria.origin) {
        return false;
      }
      
      // Filtrar por destino
      if (this.searchCriteria.destination && option.destination !== this.searchCriteria.destination) {
        return false;
      }
      
      // Filtrar por fecha
      if (this.searchCriteria.date) {
        const searchDate = new Date(this.searchCriteria.date);
        const optionDate = new Date(option.date);
        
        if (searchDate.toDateString() !== optionDate.toDateString()) {
          return false;
        }
      }
      
      return true;
    });
    
    // Reiniciar las animaciones
    setTimeout(() => {
      document.querySelectorAll('.transport-item').forEach((item, index) => {
        (item as HTMLElement).style.opacity = '0';
        setTimeout(() => {
          (item as HTMLElement).style.animationDelay = `${index * 0.05}s`;
          (item as HTMLElement).style.opacity = '';
        }, 10);
      });
    }, 10);
  }
  
  // Método para obtener el ícono adecuado según el tipo de transporte
  getTransportIcon(type: string): string {
    switch(type) {
      case 'bus': return 'bi bi-bus-front';
      case 'avion': return 'bi bi-airplane';
      case 'combi': return 'bi bi-truck';
      case 'minibus': return 'bi bi-minecart-loaded';
      case 'bote': return 'bi bi-water';
      default: return 'bi bi-truck';
    }
  }
  
  // Método para obtener el nombre para mostrar del tipo de transporte
  getTransportTypeName(type: string): string {
    switch(type) {
      case 'bus': return 'Bus';
      case 'avion': return 'Vuelo';
      case 'combi': return 'Combi';
      case 'minibus': return 'Minibús';
      case 'bote': return 'Bote';
      default: return 'Transporte';
    }
  }
  
  // Método para obtener el nombre para mostrar del tipo de ruta
  getRouteTypeName(routeType: string): string {
    switch(routeType) {
      case 'nacional': return 'Nacional';
      case 'regional': return 'Regional';
      case 'provincial': return 'Provincial';
      case 'distrital': return 'Distrital';
      default: return '';
    }
  }
}
