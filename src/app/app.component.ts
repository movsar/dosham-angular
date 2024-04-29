import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserStoreService } from './services/user-store.service';
import { ISessionInformation } from './models/session.interface';
import { ContentStoreService } from './services/content-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUserEmail: string | undefined = undefined;

  title = 'dosham';

  constructor(
    private _observer: BreakpointObserver,
    private _contentStore: ContentStoreService,
    public userStore: UserStoreService
  ) { }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  ngOnInit() {
    this._observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.userStore.activeSession.subscribe((session: ISessionInformation | undefined) => {
      this.currentUserEmail = session?.User?.Email!;
    });
  }

  onSidenavToggle(opened: boolean) {
    this.isCollapsed = !opened;
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      // On mobile, the menu can never be collapsed
      this.isCollapsed = false;
    } else {
      // On desktop/tablet, the menu can never be fully closed
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
  // Simulated user state for demonstration. Replace with your actual logic.

  searchQuery: string = '';

  search(event: any) {
    // Implement your search logic here
  }

  loadRandomEntries() {
    this._contentStore.loadRandomEntries();
  }

  loadLatestEntries() {
    
    this._contentStore.loadLatestEntries();
  }

  toggleOnModerationFlag() {
    // Implement logic for toggling OnModeration flag
  }
}
