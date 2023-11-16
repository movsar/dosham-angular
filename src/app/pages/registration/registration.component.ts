import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';

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

  constructor(private _userStore: UserStoreService, private _router: Router) { }

  async onSubmit() {
    if (!this.registrationFormGroup.valid) {
      console.error("Please fill the required fields");;
      return;
    }

    const email = this.registrationFormGroup.get('email')?.value!;
    const password = this.registrationFormGroup.get('password')?.value!;

    try {
      await this._userStore.registerNewUser(email, password);
      this._router.navigate(['/home'])
    } catch (error: any) {
      this.errorMessages.push(error.toString());
    }
  }
}
