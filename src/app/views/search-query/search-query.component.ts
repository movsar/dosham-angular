import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, exhaustMap, map, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ContentStoreService } from 'src/app/services/content-store.service';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.scss']
})
export class SearchQueryComponent implements OnInit {
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  results$ = new Observable;
  subject = new Subject<string>()

  constructor(private contentStore: ContentStoreService) {
    this.isLoggedIn = false;// this.authService.isLoggedIn();
    this.loadRandomEntries();
  }

  ngOnInit() {
   
  }

  async search(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;
    this.contentStore.findEntries(inputText)
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
