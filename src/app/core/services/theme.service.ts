import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject: BehaviorSubject<boolean>;
  public darkTheme: Observable<boolean>;

  constructor() {
    // Inicializar el tema oscuro por defecto o según preferencia guardada
    const savedTheme = localStorage.getItem('darkTheme');
    this.darkThemeSubject = new BehaviorSubject<boolean>(savedTheme === 'true' || savedTheme === null);
    this.darkTheme = this.darkThemeSubject.asObservable();
  }

  public get isDarkTheme(): boolean {
    return this.darkThemeSubject.value;
  }

  setDarkTheme(isDark: boolean): void {
    localStorage.setItem('darkTheme', isDark.toString());
    this.darkThemeSubject.next(isDark);
  }

  toggleTheme(): void {
    const newThemeValue = !this.darkThemeSubject.value;
    this.setDarkTheme(newThemeValue);
  }
}