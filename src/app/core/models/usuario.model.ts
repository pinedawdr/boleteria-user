export interface Usuario {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  foto_perfil?: string;
  direccion?: string;
  ciudad?: string;
  fecha_nacimiento?: string;
  documento_identidad?: string;
  tipo_documento?: 'dni' | 'pasaporte' | 'ce';
  metodo_pago_default?: string;
  fecha_registro: string;
  ultima_actividad?: string;
}

export interface Boleto {
  id: number;
  usuario_id: string;
  evento_id: number;
  zona_id: number;
  asiento_id?: number;
  fecha_compra: string;
  precio_pagado: number;
  metodo_pago: string;
  estado: 'pendiente' | 'pagado' | 'usado' | 'cancelado';
  codigo_qr: string;
  asistentes?: Asistente[];
}

export interface Reserva {
  id: number;
  usuario_id: string;
  viaje_id: number;
  asiento_ids: number[];
  fecha_compra: string;
  precio_pagado: number;
  metodo_pago: string;
  estado: 'pendiente' | 'pagado' | 'usado' | 'cancelado';
  codigo_qr: string;
  pasajeros?: Pasajero[];
}

export interface Asistente {
  id: number;
  boleto_id: number;
  nombre: string;
  apellido: string;
  documento_identidad: string;
  tipo_documento: 'dni' | 'pasaporte' | 'ce';
}

export interface Pasajero {
  id: number;
  reserva_id: number;
  nombre: string;
  apellido: string;
  documento_identidad: string;
  tipo_documento: 'dni' | 'pasaporte' | 'ce';
  asiento_id: number;
} 