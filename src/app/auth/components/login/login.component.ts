import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // Inicializar formulario con validadores
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Obtener la URL de retorno si existe
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    // No proceder si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          // Redirigir al usuario a la página de inicio o a la URL de retorno
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          // Mostrar mensaje de error
          const errorMessage = error?.message || 'Credenciales inválidas. Intente nuevamente.';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }
} 