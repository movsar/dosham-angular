import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  @Output() isLoggedIn = false;

  async logInEmailPassword(email: string, password: string): Promise<void> {
    // Authentication logic here
  }
}
