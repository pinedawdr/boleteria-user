import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ruta-checkout',
  templateUrl: './ruta-checkout.component.html',
  styleUrls: ['./ruta-checkout.component.scss']
})
export class RutaCheckoutComponent implements OnInit {
  @Input() transportOption: any;
  @Input() passengers: number = 1;
  @Output() back = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();
  
  checkoutForm!: FormGroup;
  isLinear = true;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.checkoutForm = this.fb.group({
      passengerInfo: this.fb.array([]),
      contactInfo: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
      }),
      paymentInfo: this.fb.group({
        cardType: ['visa', Validators.required],
        cardName: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      })
    });
    
    this.addPassengers();
  }
  
  get passengerForms(): FormArray {
    return this.checkoutForm.get('passengerInfo') as FormArray;
  }
  
  addPassengers(): void {
    for (let i = 0; i < this.passengers; i++) {
      this.passengerForms.push(this.createPassengerForm(i === 0));
    }
  }
  
  createPassengerForm(isMainPassenger: boolean = false): FormGroup {
    return this.fb.group({
      type: ['adult', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      docType: ['dni', Validators.required],
      docNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      isMainPassenger: [isMainPassenger]
    });
  }
  
  onBack(): void {
    this.back.emit();
  }
  
  onComplete(): void {
    if (this.checkoutForm.valid) {
      const bookingData = {
        transportOption: this.transportOption,
        passengers: this.checkoutForm.get('passengerInfo')?.value,
        contact: this.checkoutForm.get('contactInfo')?.value,
        payment: this.checkoutForm.get('paymentInfo')?.value
      };
      
      this.confirm.emit(bookingData);
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          } else {
            c.markAsTouched();
          }
        });
      } else if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}