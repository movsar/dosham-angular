import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.scss']
})
export class SearchQueryComponent {
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {
    this.isLoggedIn = false;// this.authService.isLoggedIn();
    this.searchService.GetRandoms(50);
  }

  search(event: Event): void {
    // Call search logic, casting the value since we know it's an input element
    this.searchService.Search((event.target as HTMLInputElement).value);
  }

  loadRandomEntries(): void {
    this.searchService.GetRandoms(50);
    // Implement random entries loading logic
  }

  toggleOnModerationFlag(): void {
    // Implement moderation flag toggle logic
  }

  loadLatestEntries(): void {
    // Implement latest entries loading logic
  }
}
