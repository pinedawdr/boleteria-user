import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rutas-search',
  templateUrl: './rutas-search.component.html',
  styleUrls: ['./rutas-search.component.scss']
})
export class RutasSearchComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  @Input() loading: boolean = false;
  
  searchForm!: FormGroup;
  ciudades = [
    'Lima', 'Cusco', 'Arequipa', 'Trujillo', 'Chiclayo', 
    'Piura', 'Iquitos', 'Huancayo', 'Pucallpa', 'Tacna',
    'Valle Sagrado', 'Colca', 'Reserva Pacaya Samiria', 'Pachacamac'
  ];
  
  minDate = new Date();
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: [new Date(), Validators.required],
      returnDate: [''],
      transportType: ['all'],
      routeType: ['all'], // Nuevo campo para tipo de ruta
      passengers: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }
  
  onSubmit(): void {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value);
    } else {
      this.markFormGroupTouched(this.searchForm);
    }
  }
  
  // Función para marcar todos los controles como touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  // Prevenir la selección del mismo origen y destino
  updateDestinations(origin: string): void {
    if (this.searchForm.get('destination')?.value === origin) {
      this.searchForm.get('destination')?.setValue('');
    }
  }
}