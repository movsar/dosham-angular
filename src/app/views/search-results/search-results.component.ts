import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEntry, EntryType } from 'src/app/models/entry.model';
import { ContentStoreService } from 'src/app/services/content-store.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  // This exposes the enum to the template
  EntryType = EntryType;

  // Search results
  entries: IEntry[] = [];

  // A flag to check whether the fetch has been completed 
  inProgress: boolean = true;

  private subscription: Subscription = new Subscription();

  constructor(private contentStoreService: ContentStoreService) { }

  ngOnInit(): void {
    // Subscribe to the entries updates
    this.subscription.add(
      this.contentStoreService.entries$.subscribe({
        next: (entries) => {
          this.entries = entries;
          this.inProgress = false;
        },
        error: (error) => {
          console.error('Failed to load entries', error);
        }
      })
    );
    this.inProgress = true;
  }

  ngOnDestroy(): void {
    // Cleanup - unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}