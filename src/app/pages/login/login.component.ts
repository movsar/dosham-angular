import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from 'src/app/services/user-store.service';

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
    private _userStore: UserStoreService,
    private _route: ActivatedRoute,
    private _router: Router) {
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

  async logInEmailPassword(email: string, password: string) {
    try {
      await this._userStore.logInEmailPassword(email, password);
      this._router.navigate(['/home'])
    } catch (error: any) {
      // Handle login error
      this.errorMessages.push(error);
    }
  }

  async onResetClick() {
    this._router.navigate(['/password-reset']);
  }

  onRegisterClick():void {
    this._router.navigate(['/registration'])
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      this.errorMessages.push("Please fill the required fields");;
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    await this.logInEmailPassword(email, password);
  }
}
