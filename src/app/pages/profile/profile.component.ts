import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private _userStore: UserStoreService,
    private _router: Router
  ) { }

  onLogOutClick(): void {
    this._userStore.LogOut();
    this._router.navigate(['/']);
  }
}
