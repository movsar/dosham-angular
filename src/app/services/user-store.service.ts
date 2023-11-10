import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private _requestService: ApiRequestService) {}

  // Implement user-related methods and properties here
  get isloggedIn(): boolean {
    // Your logic to determine if the user is logged in
    return false;
  }

  get currentUser(): any {
    // Your logic to get the current user
    return null;
  }
}
