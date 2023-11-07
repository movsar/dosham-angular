import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEntry, EntryType } from 'src/app/models/entry.model';
import { ContentStoreService } from 'src/app/services/content-store.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  EntryType = EntryType; // This exposes the enum to the template
  entries: IEntry[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private contentStoreService: ContentStoreService) { }

  ngOnInit(): void {
    // Subscribe to the entries updates
    this.subscription.add(
      this.contentStoreService.entries$.subscribe(
        (entries) => {
          this.entries = entries;
        },
        (error) => {
          console.error('Failed to load entries', error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    // Cleanup - unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}