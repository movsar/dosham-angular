import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { ISessionInformation } from '../models/session.interface';
import { IUser } from '../models/user-dto.interface';
import { RequestResult } from '../models/request-result.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private activeSessionSubject = new BehaviorSubject<ISessionInformation | undefined>(undefined);
  public activeSession: Observable<ISessionInformation | undefined> = this.activeSessionSubject.asObservable();

  public get currentUser(): IUser | undefined {
    return this.activeSessionSubject.getValue()?.User;
  }

  constructor(private _requestService: ApiRequestService) {
    const sessionSerialized = localStorage.getItem("session");
    if (!sessionSerialized) {
      return;
    }

    const session = JSON.parse(sessionSerialized) as ISessionInformation;
    this.activeSessionSubject.next(session);

    // TODO: If AccessCode is expired, run in background refresh flow using the RefreshCode
  }

  logOut() {
    this.activeSessionSubject.next(undefined);
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
    if (session.AccessToken.length > 0) {
      this.activeSessionSubject.next(session);
    } else {
      throw "An unexpected exception occurred";
    }

    localStorage.setItem("session", JSON.stringify(session));
  }
}