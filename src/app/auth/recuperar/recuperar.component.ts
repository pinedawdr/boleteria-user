import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  resetForm!: FormGroup;
  loading = false;
  submitted = false;
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // getter para acceder fácilmente a los form controls
  get f() { return this.resetForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // detener si el formulario es inválido
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;

    // Aquí iría la lógica para solicitar restablecimiento de contraseña
    setTimeout(() => {
      this.loading = false;
      this.emailSent = true;
      alert('Se han enviado instrucciones a tu correo electrónico para restablecer tu contraseña.');
      this.router.navigate(['/auth/login']);
    }, 1500);
  }
}
