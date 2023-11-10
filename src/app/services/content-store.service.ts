import { Injectable } from '@angular/core';
import { IEntry } from '../models/entry.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITranslation } from '../models/translation.model';
import { EntryService } from './entry.service';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {
  private entriesSubject: BehaviorSubject<IEntry[]> = new BehaviorSubject<IEntry[]>([]);
  public entries$: Observable<IEntry[]> = this.entriesSubject.asObservable();

  public currentEntries: IEntry[] = [];

  constructor(private _entryService: EntryService) { }

  entryService = this._entryService;

  promoteEntry(entry: IEntry) {

  }

  removeEntry(entry: IEntry) {

  }

  promoteTranslation(translation: ITranslation) {

  }
  entryComparator(e1: IEntry, e2: IEntry) {
    if (e1.Content > e2.Content) {
      return 1;
    } else {
      return -1;
    }
  }
  setCurrentEntries(entries :IEntry[]){
    this.currentEntries = entries.sort(this.entryComparator);
    this.currentEntries.map(e => e.Content = e.Content.substring(0,1).toUpperCase() + e.Content.substring(1));
    this.entriesSubject.next(this.currentEntries);
  }

  async findEntries(inputText: string) {
    if (inputText.length == 0) {
      this.setCurrentEntries([]);
    } else {
      this.setCurrentEntries(await this._entryService.search(inputText));
    }
  }

  async loadRandomEntries() {
    this.setCurrentEntries(await this._entryService.getRandoms(50));
  }

  addEntry(entry: IEntry): void {
    const currentValue = this.entriesSubject.value;
    const updatedValue = [...currentValue, entry];
    this.setCurrentEntries(updatedValue);
  }

  clearEntries(): void {
    this.setCurrentEntries([]);
  }
}
