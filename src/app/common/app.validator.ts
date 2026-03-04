import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarQueSeanIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmarPassword = control.get('confirmarPassword')?.value;

  return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
};