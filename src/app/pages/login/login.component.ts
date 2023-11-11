import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailConfirmationCompleted = false;
  formSubmitted: boolean = false;
  errorMessages: string[] = [];
  private pageInitialized = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _route: ActivatedRoute) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.checkEmailConfirmation();
  }

  private checkEmailConfirmation(): void {
    if (this.pageInitialized) {
      return;
    }

    this.pageInitialized = true;
    const token = this._route.snapshot.queryParamMap.get('token');

    if (token && !this.emailConfirmationCompleted) {
      this.confirmEmail(token);
    }
  }

  private async confirmEmail(token: string): Promise<void> {
    try {
      await this.confirmEmail(token);
      this.emailConfirmationCompleted = true;
    } catch (error) {
      console.error('Error confirming email:', error);
    }
  }

  async signInWithEmailPassword(email: string, password: string) {
    try {
      console.log(email);
      await this._userService.logInEmailPassword(email, password);
      // Navigate to home or dashboard page
    } catch (error) {
      // Handle login error
      this.errorMessages.push('Login failed');
    }
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      console.error("form is not valid");;
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    await this.signInWithEmailPassword(email, password);
  }
}
