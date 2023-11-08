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

  constructor(private searchService: SearchService) { }

  promoteEntry(entry:IEntry){

  }

  removeEntry(entry:IEntry){

  }

  promoteTranslation(translation:ITranslation){

  }

  async findEntries(inputText:string){
    const entries = await this.searchService.Search(inputText);
    this.entriesSubject.next(entries);
  }

  async loadRandomEntries() {
    console.log("requesting random entries");

    const entries = await this.searchService.GetRandoms(50);
    this.entriesSubject.next(entries);
    
    console.log("random entries received");
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
