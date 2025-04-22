import { Injectable } from '@angular/core';
import { Observable, from, map, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Usuario, Boleto, Reserva } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private supabase: SupabaseService) { }
  
  // Obtener información del usuario actual
  getCurrentUser(): Observable<Usuario | null> {
    return from(this.supabase.client.auth.getUser()).pipe(
      switchMap(({ data, error }) => {
        if (error) return throwError(() => error);
        if (!data.user) return of(null);
        
        return this.getUserById(data.user.id);
      }),
      catchError(error => {
        console.error('Error obteniendo usuario actual:', error);
        return of(null);
      })
    );
  }
  
  // Obtener usuario por ID
  getUserById(id: string): Observable<Usuario | null> {
    const query = this.supabase.client
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();
      
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Usuario;
      }),
      catchError(error => {
        console.error('Error obteniendo usuario por ID:', error);
        return of(null);
      })
    );
  }
  
  // Actualizar perfil de usuario
  updateUserProfile(userId: string, userData: Partial<Usuario>): Observable<Usuario> {
    const query = this.supabase.client
      .from('usuarios')
      .update(userData)
      .eq('id', userId)
      .select()
      .single();
      
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Usuario;
      })
    );
  }
  
  // Obtener boletos del usuario
  getUserBoletos(userId: string): Observable<Boleto[]> {
    const query = this.supabase.client
      .from('boletos')
      .select('*, evento:evento_id(*), zona:zona_id(*), asiento:asiento_id(*), asistentes(*)')
      .eq('usuario_id', userId)
      .order('fecha_compra', { ascending: false });
      
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Boleto[];
      })
    );
  }
  
  // Obtener reservas del usuario
  getUserReservas(userId: string): Observable<Reserva[]> {
    const query = this.supabase.client
      .from('reservas')
      .select('*, viaje:viaje_id(*, ruta(*)), pasajeros(*)')
      .eq('usuario_id', userId)
      .order('fecha_compra', { ascending: false });
      
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Reserva[];
      })
    );
  }
  
  // Comprar boleto para evento
  comprarBoleto(boleto: Partial<Boleto>): Observable<Boleto> {
    const query = this.supabase.client
      .from('boletos')
      .insert(boleto)
      .select()
      .single();
      
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Boleto;
      })
    );
  }
  
  // Reservar viaje de transporte
  reservarViaje(reserva: Partial<Reserva>): Observable<Reserva> {
    const query = this.supabase.client
      .from('reservas')
      .insert(reserva)
      .select()
      .single();
      
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Reserva;
      })
    );
  }
  
  // Cancelar boleto
  cancelarBoleto(boletoId: number): Observable<void> {
    const query = this.supabase.client
      .from('boletos')
      .update({ estado: 'cancelado' })
      .eq('id', boletoId);
      
    return from(query).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
  
  // Cancelar reserva
  cancelarReserva(reservaId: number): Observable<void> {
    const query = this.supabase.client
      .from('reservas')
      .update({ estado: 'cancelado' })
      .eq('id', reservaId);
      
    return from(query).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
} 