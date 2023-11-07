import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ContentStoreService } from 'src/app/services/content-store.service';
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
    private authService: UserService,
    private searchService: SearchService,
    private contentStore: ContentStoreService
  ) {
    this.isLoggedIn = false;// this.authService.isLoggedIn();
    this.loadRandomEntries();
  }

  search(event: Event): void {
    // Call search logic, casting the value since we know it's an input element
    this.searchService.Search((event.target as HTMLInputElement).value);
  }

  async loadRandomEntries() {
    await this.contentStore.loadRandomEntries();
  }

  toggleOnModerationFlag(): void {
    // Implement moderation flag toggle logic
  }

  loadLatestEntries(): void {
    // Implement latest entries loading logic
  }
}
