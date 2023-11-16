import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { ISessionInformation } from '../models/session.interface';
import { User } from '../models/user.model';
import { RequestResult } from '../models/request-result.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _activeSessionSubject = new BehaviorSubject<ISessionInformation | undefined>(undefined);
  public activeSession: Observable<ISessionInformation | undefined> = this._activeSessionSubject.asObservable();

  public get CurrentUser(): User | undefined {
    return this._activeSessionSubject.getValue()?.User;
  }

  async updatePassword(email: string, token: string, newPassword: string) {
    const data = await this._requestService.updatePasswordRequest(email, token, newPassword);
    if (!data.success) {
      throw data.errorMessage;
    }
  }

  async resetPassword(email: String) {
    const data = await this._requestService.passwordResetRequest(email);
    if (!data.success) {
      throw data.errorMessage;
    }
  }

  logOut() {
    this._activeSessionSubject.next(undefined);
    localStorage.removeItem("session");
  }

  async registerNewUser(email: string, password: string) {
    const data = await this._requestService.registerNewUserRequest(email, password);
    this.setCurrentUserFromLoginResponse(data);
  }

  async logInEmailPassword(email: string, password: string) {
    const data = await this._requestService.logInEmailPasswordRequest(email, password);
    this.setCurrentUserFromLoginResponse(data);
  };

  setCurrentUserFromLoginResponse(data: RequestResult) {
    if (!data.success) {
      throw data.errorMessage;
    }

    const session: ISessionInformation = JSON.parse(data.serializedData);
    session.User = new User(session.User);
    if (session.AccessToken.length > 0) {
      this._activeSessionSubject.next(session);
    } else {
      throw "An unexpected exception occurred";
    }

    localStorage.setItem("session", JSON.stringify(session));
  }

  constructor(private _requestService: ApiRequestService) {
    const sessionSerialized = localStorage.getItem("session");
    if (!sessionSerialized) {
      return;
    }

    const session = JSON.parse(sessionSerialized) as ISessionInformation;
    session.User = new User(session.User);
    this._activeSessionSubject.next(session);

    // TODO: If AccessCode is expired, run in background refresh flow using the RefreshCode
  }
}