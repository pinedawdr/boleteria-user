import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  // Variable para controlar la autenticación en la plantilla
  private authenticated: boolean = false;
  
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Inicializar el estado de autenticación
    this.checkAuthenticationStatus();
  }

  // Verificar si el usuario está autenticado
  private checkAuthenticationStatus(): void {
    // Verificar de manera simple si hay un token en localStorage
    const token = localStorage.getItem('auth_token');
    this.authenticated = !!token;
    
    // No intentamos verificar propiedades específicas del AuthService
    // ya que no conocemos su implementación exacta
  }
  
  // Método público para usar en la plantilla
  isUserAuthenticated(): boolean {
    return this.authenticated;
  }

  // Método para navegar a la página de registro
  navigateToRegister(): void {
    this.router.navigate(['/auth/registro']);
  }

  // Método para navegar a la página de login
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
  
  // Método para realizar búsquedas
  search(): void {
    if (this.searchQuery && this.searchQuery.trim()) {
      // Navegar a la ruta de búsqueda con el query como parámetro
      this.router.navigate(['/buscar'], { 
        queryParams: { q: this.searchQuery.trim() } 
      });
      
      // Limpiar el campo de búsqueda después de buscar
      this.searchQuery = '';
    }
  }
  
  // Método para cerrar sesión
  logout(): void {
    try {
      // Intentamos usar el método logout del AuthService
      // pero no asumimos nada sobre su implementación
      if (typeof this.authService.logout === 'function') {
        const result = this.authService.logout();
        // Si devuelve un observable, intentamos suscribirnos
        if (result && typeof result.subscribe === 'function') {
          result.subscribe({
            next: () => this.handleLogoutSuccess(),
            error: () => this.handleLogoutSuccess() // En caso de error, también limpiamos
          });
        } else {
          // Si no es un observable, simplemente limpiamos
          this.handleLogoutSuccess();
        }
      } else {
        // Si no existe el método, limpiamos localmente
        this.handleLogoutSuccess();
      }
    } catch (error) {
      // En caso de cualquier error, limpiamos localmente
      console.error('Error en logout:', error);
      this.handleLogoutSuccess();
    }
  }
  
  // Método auxiliar para manejar la limpieza después del logout
  private handleLogoutSuccess(): void {
    this.authenticated = false;
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }
}