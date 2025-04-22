import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  returnUrl = '/';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
    
    // Obtener la URL de retorno si existe
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  // getter para acceder fácilmente a los form controls
  get f() { return this.loginForm.controls; }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    // detener si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.snackBar.open('Error al iniciar sesión: ' + error, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }
  
  loginWithSocial(provider: string): void {
    // Implementar lógica de login social
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      console.log(`Login con ${provider}`);
    }, 1000);
  }
}