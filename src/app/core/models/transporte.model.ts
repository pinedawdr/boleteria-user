export interface Ruta {
  id: number;
  origen: string;
  destino: string;
  precio: number;
  tipo_transporte: string;
  duracion?: number;
  hora_salida?: string;
  hora_llegada?: string;
  empresa?: Empresa;
  empresa_id?: number;
}

export interface Empresa {
  id?: number;
  nombre: string;
  logo?: string;
  descripcion?: string;
  rating?: number;
}

export interface Viaje {
  id: number;
  ruta_id: number;
  ruta?: Ruta;
  fecha_salida: string;
  hora_salida: string;
  fecha_llegada: string;
  hora_llegada: string;
  precio_base: number;
  vehiculo_id: number;
  plazas_disponibles: number;
  plazas_totales: number;
  estado: 'programado' | 'en_ruta' | 'completado' | 'cancelado';
}

export interface Vehiculo {
  id: number;
  empresa_id: number;
  tipo: 'bus' | 'tren' | 'barco';
  modelo: string;
  patente: string;
  capacidad_total: number;
  comodidades: string[];
}

export interface AsientoVehiculo {
  id: number;
  vehiculo_id: number;
  viaje_id: number;
  nombre: string;
  tipo: 'normal' | 'vip' | 'cama' | 'semicama';
  precio: number;
  estado: 'disponible' | 'reservado' | 'vendido';
  coordenada_x?: number;
  coordenada_y?: number;
} 