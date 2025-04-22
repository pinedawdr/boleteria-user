import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }
  
  // Validador personalizado para que las contraseñas coincidan
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // Si hay otro error, no hacer nada
        return;
      }

      // Establecer error si las contraseñas no coinciden
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  // getter para acceder fácilmente a los form controls
  get f() { return this.registerForm.controls; }
  
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    // detener si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const { nombre, apellido, email, password } = this.registerForm.value;
    
    // Modificamos esto para adaptar el objeto de registro al formato esperado por el AuthService
    const userData = {
      email,
      password,
      nombre,
      apellido
    };
    
    // Hacemos la llamada al servicio con un solo argumento
    this.authService.register(userData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.snackBar.open('Registro exitoso. Ahora puedes iniciar sesión.', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.snackBar.open('Error al registrarse: ' + error, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }
  
  registerWithSocial(provider: string): void {
    // Implementar lógica de registro social
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      console.log(`Registro con ${provider}`);
      this.snackBar.open(`Registro con ${provider} en desarrollo`, 'Cerrar', {
        duration: 3000
      });
    }, 1000);
  }
}
