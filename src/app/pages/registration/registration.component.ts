import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  formSubmitted = false;
  errorMessages: string[] = [];

  validateAndSubmit(): void {
    if (this.registrationFormGroup.valid) {
      // Implement your submission logic here
      console.log(this.registrationFormGroup.value);
    } else {
      // Handle validation errors
      console.error('Form is not valid');
    }
  }
}
