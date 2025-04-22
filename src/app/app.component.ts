import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { MatSidenav } from '@angular/material/sidenav';

// Busca importaciones como:
// import { HeaderComponent } from './path/to/real/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  
  title = 'user-platform';
  isLoggedIn = false;
  isDarkTheme = true; // Por defecto será tema oscuro
  currentYear = new Date().getFullYear();
  searchFocused = false; // Estado para el buscador
  
  private subscriptions: Subscription[] = [];
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Aplicar tema oscuro por defecto
    this.applyTheme(true);
    
    // Cerrar sidenav cuando cambia la ruta (especialmente en móviles)
    const routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.drawer) {
        // Verificar si está en modo móvil
        this.isHandset$.subscribe(isHandset => {
          if (isHandset) {
            this.drawer.close();
          }
        });
      }
    });
    
    this.subscriptions.push(routerSub);
  }

  ngOnDestroy(): void {
    // Limpiar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Aplica el tema en el DOM
   */
  private applyTheme(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  /**
   * Cambia entre tema claro y oscuro
   */
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme);
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    // Usamos el método logout de AuthService
    const logoutObservable = this.authService.logout();
    
    if (logoutObservable) {
      const sub = logoutObservable.subscribe({
        next: () => {
          this.isLoggedIn = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error al cerrar sesión:', err);
        }
      });
      
      this.subscriptions.push(sub);
    } else {
      // Si por alguna razón el método no devuelve un Observable
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    }
  }

  /**
   * Realiza una búsqueda
   * @param query Texto a buscar
   */
  search(query: string): void {
    if (!query.trim()) {
      return;
    }
    
    // Navegar a la página de resultados de búsqueda
    this.router.navigate(['/buscar'], { queryParams: { q: query } });
  }
}
