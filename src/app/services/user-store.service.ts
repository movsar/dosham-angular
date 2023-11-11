import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { ISessionInformation } from '../models/session.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private _requestService: ApiRequestService) { }

  isloggedIn: boolean = false;

  get currentUser(): any {
    // Your logic to get the current user
    return null;
  }

  async registerNewUser(email: string, password: string) {
    const data = await this._requestService.registerNewUserRequest(email, password);
    if (!data.success) {
      throw data.errorMessage;
    }

    const session: ISessionInformation = JSON.parse(data.serializedData);
  }

  async logInEmailPassword(email: string, password: string) {
    const data = await this._requestService.logInEmailPasswordRequest(email, password);
    if (!data.success) {
      throw data.errorMessage;
    }

    const session: ISessionInformation = JSON.parse(data.serializedData);

    if (session.AccessToken.length > 0) {
      this.isloggedIn = true;
    }

    return session;
  };
}