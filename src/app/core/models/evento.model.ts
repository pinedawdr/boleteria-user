export interface Evento {
  id: number;
  titulo?: string;
  nombre: string;
  descripcion?: string;
  fecha: Date | string;
  ubicacion: string;
  precio: number;
  precio_desde?: number;
  categoriaId: string | number;
  categoria_id?: number;
  imagen?: string;
  imagen_url?: string;
}

export interface ZonaEvento {
  id: number;
  evento_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  capacidad_total: number;
  capacidad_disponible: number;
  color: string;
}

export interface AsientoEvento {
  id: number;
  zona_id: number;
  fila: string;
  numero: string;
  estado: 'disponible' | 'reservado' | 'vendido';
  precio: number;
  coordenada_x?: number;
  coordenada_y?: number;
} 