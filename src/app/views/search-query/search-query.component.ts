import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, exhaustMap, map, tap } from 'rxjs';
import { ContentStoreService } from 'src/app/services/content-store.service';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.scss']
})
export class SearchQueryComponent implements OnInit {
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  subject = new Subject<string>()

  constructor(private contentStore: ContentStoreService) {
    this.isLoggedIn = false;// this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.subject.pipe(
      debounceTime(500),
      map((searchText: string) => this.contentStore.findEntries(searchText))
    ).subscribe({
      error: error => {
        console.error(error);
      }
    });

    if (this.contentStore.currentEntries.length == 0) {
      this.loadRandomEntries();
    }
  }

  async search(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;
    this.subject.next(inputText.trim());
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
