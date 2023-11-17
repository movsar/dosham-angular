import { Injectable } from '@angular/core';
import { Entry } from '../models/entry.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Translation } from '../models/translation.model';
import { EntryService } from './entry.service';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {
  private entriesSubject: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);
  public entries$: Observable<Entry[]> = this.entriesSubject.asObservable();

  public currentEntries: Entry[] = [];

  constructor(private _entryService: EntryService) { }

  entryService = this._entryService;

  promoteEntry(entry: Entry) {

  }

  removeEntry(entry: Entry) {

  }

  promoteTranslation(translation: Translation) {

  }
  entryComparator(e1: Entry, e2: Entry) {
    if (e1.Content > e2.Content) {
      return 1;
    } else {
      return -1;
    }
  }
  setCurrentEntries(entries: Entry[]) {
    this.currentEntries = entries.sort(this.entryComparator);
    this.currentEntries.map(e => e.Content = e.Content.substring(0, 1).toUpperCase() + e.Content.substring(1));
    this.entriesSubject.next(this.currentEntries);
  }

  async findEntries(inputText: string) {
    if (inputText.length == 0) {
      this.setCurrentEntries([]);
    } else {
      this.setCurrentEntries(await this._entryService.search(inputText));
    }
  }

  async loadLatestEntries() {
    const latest = await this._entryService.getLatest(50);
    this.setCurrentEntries(latest);
  }

  async loadRandomEntries() {
    const randoms = await this._entryService.getRandoms(50);
    this.setCurrentEntries(randoms);
  }

  addEntry(entry: Entry): void {
    const currentValue = this.entriesSubject.value;
    const updatedValue = [...currentValue, entry];
    this.setCurrentEntries(updatedValue);
  }

  clearEntries(): void {
    this.setCurrentEntries([]);
  }
}
