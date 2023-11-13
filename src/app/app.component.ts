import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserStoreService } from './services/user-store.service';
import { User } from './models/user.model';
import { ISessionInformation } from './models/session.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUserEmail: string | undefined = undefined;

  title = 'dosham';

  constructor(
    private observer: BreakpointObserver,
    public _userStore: UserStoreService
  ) { }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this._userStore.activeSession.subscribe((session: ISessionInformation | undefined) => {
      this.currentUserEmail = session?.User?.Email!;
    });
  }
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
  // Simulated user state for demonstration. Replace with your actual logic.

  searchQuery: string = '';

  search(event: any) {
    // Implement your search logic here
  }

  loadRandomEntries() {
    // Implement loading random entries logic here
  }

  toggleOnModerationFlag() {
    // Implement logic for toggling OnModeration flag
  }
}
