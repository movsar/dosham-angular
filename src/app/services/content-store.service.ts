import { Injectable } from '@angular/core';
import { IEntry } from '../models/entry.model';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {
  private entriesSubject: BehaviorSubject<IEntry[]> = new BehaviorSubject<IEntry[]>([]);
  public entries$: Observable<IEntry[]> = this.entriesSubject.asObservable();

  constructor() { }

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
