import { Component } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  formSubmitted: boolean = false;
  resetPasswordForm!: FormGroup;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, public userStore: UserStoreService) { }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  async validateAndSubmit() {
    if (!this.resetPasswordForm.valid) {
      this.errorMessages = ['Please enter a valid email.'];
      return;
    }

    const email = this.resetPasswordForm.get('email')?.value;

    try {
      this.errorMessages = [];
      await this.userStore.ResetPassword(email);
      this.formSubmitted = true;
    } catch (error: any) {
      this.formSubmitted = false;
      this.errorMessages.push(error);
    }
  }
}
