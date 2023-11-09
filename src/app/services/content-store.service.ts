import { Injectable } from '@angular/core';
import { IEntry } from '../models/entry.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchService } from './search.service';
import { ITranslation } from '../models/translation.model';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {
  private entriesSubject: BehaviorSubject<IEntry[]> = new BehaviorSubject<IEntry[]>([]);
  public entries$: Observable<IEntry[]> = this.entriesSubject.asObservable();

  public currentEntries: IEntry[] = [];

  constructor(private searchService: SearchService) { }

  promoteEntry(entry: IEntry) {

  }

  removeEntry(entry: IEntry) {

  }

  promoteTranslation(translation: ITranslation) {

  }

  async findEntries(inputText: string) {
    if (inputText.length == 0) {
      this.entriesSubject.next([]);
    } else {
      this.currentEntries = await this.searchService.Search(inputText);
      this.entriesSubject.next(this.currentEntries);
    }
  }

  async loadRandomEntries() {
    this.currentEntries = await this.searchService.GetRandoms(50);
    this.entriesSubject.next(this.currentEntries);
  }

  setEntries(entries: IEntry[]): void {
    this.entriesSubject.next(entries);
  }

  addEntry(entry: IEntry): void {
    const currentValue = this.entriesSubject.value;
    const updatedValue = [...currentValue, entry];
    this.entriesSubject.next(updatedValue);
  }

  clearEntries(): void {
    this.entriesSubject.next([]);
  }
}
