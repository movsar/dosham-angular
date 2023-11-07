import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Simulated user state for demonstration. Replace with your actual logic.
  isLoggedIn = false; // Initially set to false. Change this to use your actual authentication service or logic.
  currentUserEmail = 'user@example.com'; // Dummy email. Replace with the actual email once the user is logged in.

  // Toggle for the sidenav
  sidenav: any;

  searchQuery: string = '';

  constructor() { }

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
