import { FormGroup } from '@angular/forms';

// Validador personalizado para comprobar que dos campos coinciden
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // devolver si otro validador ya ha encontrado un error
            return;
        }

        // establecer error en matchingControl si la validación falla
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
