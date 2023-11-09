import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dosham';

  constructor(private observer: BreakpointObserver) {}

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
  isLoggedIn = false; // Initially set to false. Change this to use your actual authentication service or logic.
  currentUserEmail = 'user@example.com'; // Dummy email. Replace with the actual email once the user is logged in.

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
