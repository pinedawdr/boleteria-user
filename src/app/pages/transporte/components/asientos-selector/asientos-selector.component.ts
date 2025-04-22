import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Seat {
  id: string;
  number: string;
  type: 'window' | 'aisle' | 'middle';
  status: 'available' | 'occupied' | 'selected';
  price: number;
}

@Component({
  selector: 'app-asientos-selector',
  templateUrl: './asientos-selector.component.html',
  styleUrls: ['./asientos-selector.component.scss']
})
export class AsientosSelectorComponent implements OnInit {
  @Input() transportType: string = 'bus'; // 'bus', 'avion', 'combi', 'minibus', 'bote'
  @Input() maxSelections: number = 1;
  @Output() seatSelected = new EventEmitter<Seat[]>();
  
  busSeats: Seat[] = [];
  planeSeats: Seat[] = [];
  combiSeats: Seat[] = [];
  minibusSeats: Seat[] = [];
  boatSeats: Seat[] = [];
  selectedSeats: Seat[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.generateSeats();
  }
  
  generateSeats(): void {
    switch(this.transportType) {
      case 'bus':
        this.generateBusSeats();
        break;
      case 'avion':
        this.generatePlaneSeats();
        break;
      case 'combi':
        this.generateCombiSeats();
        break;
      case 'minibus':
        this.generateMinibusSeats();
        break;
      case 'bote':
        this.generateBoatSeats();
        break;
      default:
        this.generateBusSeats();
    }
  }
  
  generateBusSeats(): void {
    for (let row = 1; row <= 12; row++) {
      this.busSeats.push({
        id: `${row}A`,
        number: `${row}A`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 50
      });
      
      this.busSeats.push({
        id: `${row}B`,
        number: `${row}B`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 50
      });
      
      this.busSeats.push({
        id: `${row}C`,
        number: `${row}C`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 50
      });
      
      this.busSeats.push({
        id: `${row}D`,
        number: `${row}D`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 50
      });
    }
  }
  
  generatePlaneSeats(): void {
    for (let row = 1; row <= 20; row++) {
      this.planeSeats.push({
        id: `${row}A`,
        number: `${row}A`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 80
      });
      
      this.planeSeats.push({
        id: `${row}B`,
        number: `${row}B`,
        type: 'middle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 80
      });
      
      this.planeSeats.push({
        id: `${row}C`,
        number: `${row}C`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 80
      });
      
      this.planeSeats.push({
        id: `${row}D`,
        number: `${row}D`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 80
      });
      
      this.planeSeats.push({
        id: `${row}E`,
        number: `${row}E`,
        type: 'middle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 80
      });
      
      this.planeSeats.push({
        id: `${row}F`,
        number: `${row}F`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 80
      });
    }
  }
  
  generateCombiSeats(): void {
    for (let row = 1; row <= 5; row++) {
      this.combiSeats.push({
        id: `${row}A`,
        number: `${row}A`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 25
      });
      
      this.combiSeats.push({
        id: `${row}B`,
        number: `${row}B`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 25
      });
      
      this.combiSeats.push({
        id: `${row}C`,
        number: `${row}C`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 25
      });
    }
  }
  
  generateMinibusSeats(): void {
    for (let row = 1; row <= 7; row++) {
      this.minibusSeats.push({
        id: `${row}A`,
        number: `${row}A`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 45
      });
      
      this.minibusSeats.push({
        id: `${row}B`,
        number: `${row}B`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 45
      });
      
      this.minibusSeats.push({
        id: `${row}C`,
        number: `${row}C`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 45
      });
      
      this.minibusSeats.push({
        id: `${row}D`,
        number: `${row}D`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 45
      });
    }
  }
  
  generateBoatSeats(): void {
    for (let row = 1; row <= 6; row++) {
      this.boatSeats.push({
        id: `${row}A`,
        number: `${row}A`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 120
      });
      
      this.boatSeats.push({
        id: `${row}B`,
        number: `${row}B`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 120
      });
      
      this.boatSeats.push({
        id: `${row}C`,
        number: `${row}C`,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 120
      });
      
      this.boatSeats.push({
        id: `${row}D`,
        number: `${row}D`,
        type: 'window',
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        price: 120
      });
    }
  }
  
  get seats(): Seat[] {
    switch(this.transportType) {
      case 'bus': return this.busSeats;
      case 'avion': return this.planeSeats;
      case 'combi': return this.combiSeats;
      case 'minibus': return this.minibusSeats;
      case 'bote': return this.boatSeats;
      default: return this.busSeats;
    }
  }
  
  toggleSeat(seat: Seat): void {
    if (seat.status === 'occupied') return;
    
    if (seat.status === 'selected') {
      seat.status = 'available';
      this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
    } else {
      if (this.selectedSeats.length >= this.maxSelections) {
        const firstSelected = this.selectedSeats.shift();
        if (firstSelected) {
          const seatToDeselect = this.seats.find(s => s.id === firstSelected.id);
          if (seatToDeselect) {
            seatToDeselect.status = 'available';
          }
        }
      }
      
      seat.status = 'selected';
      this.selectedSeats.push(seat);
    }
    
    this.seatSelected.emit(this.selectedSeats);
  }
  
  getSeatClasses(seat: Seat): string {
    return `seat ${seat.type} ${seat.status}`;
  }
  
  getSeatsForRow(row: number): Seat[] {
    return this.seats.filter(seat => seat.number.startsWith(row.toString()));
  }
  
  get totalRows(): number[] {
    switch(this.transportType) {
      case 'bus': return Array(12).fill(0).map((_, i) => i + 1);
      case 'avion': return Array(20).fill(0).map((_, i) => i + 1);
      case 'combi': return Array(5).fill(0).map((_, i) => i + 1);
      case 'minibus': return Array(7).fill(0).map((_, i) => i + 1);
      case 'bote': return Array(6).fill(0).map((_, i) => i + 1);
      default: return Array(12).fill(0).map((_, i) => i + 1);
    }
  }
  
  calculateTotalPrice(): number {
    return this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }
}