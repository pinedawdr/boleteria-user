import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['consulta', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });
  
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      
      // Simulación de envío de formulario
      setTimeout(() => {
        this.loading = false;
        this.snackBar.open('¡Mensaje enviado con éxito! Te responderemos a la brevedad.', 'Cerrar', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.contactForm.reset({
          subject: 'consulta'
        });
      }, 1500);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  // Función auxiliar para marcar todos los campos como tocados
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
