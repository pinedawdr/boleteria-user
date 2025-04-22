import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  featuredEvents = [
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
    }
  ];
  
  popularDestinations = [
    {
      id: 1,
      city: 'Cusco',
      from: 'Lima',
      price: '240',
      imageUrl: 'assets/images/destinations/cusco.webp'
    },
    {
      id: 2,
      city: 'Arequipa',
      from: 'Lima',
      price: '180',
      imageUrl: 'assets/images/destinations/arequipa.webp'
    },
    {
      id: 3,
      city: 'Trujillo',
      from: 'Lima',
      price: '120',
      imageUrl: 'assets/images/destinations/trujillo.webp'
    },
    {
      id: 4,
      city: 'Iquitos',
      from: 'Lima',
      price: '320',
      imageUrl: 'assets/images/destinations/iquitos.webp'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
    // Para implementar animaciones o cargar datos
  }
}
