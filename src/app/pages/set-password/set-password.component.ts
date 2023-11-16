import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent {
  passwordForm!: FormGroup;
  formSubmitted = false;
  errorMessages: string[] = [];

  constructor(private fb: FormBuilder,
    private userStore: UserStoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  async validateAndSubmitAsync() {
    if (!this.passwordForm.valid) {
      return;
    }

    let email: string = "";
    let token: string = "";

    // Extracting query parameters synchronously
    this.activatedRoute.queryParams.subscribe(params => {
      email = params['email'];
      token = params['token'];
    });

    // Check if email and token are available
    if (!email || !token) {
      this.router.navigateByUrl('/');
      return;
    }

    const password = this.passwordForm.get('password')?.value;

    try {
      await this.userStore.updatePassword(email, token, password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }
}
