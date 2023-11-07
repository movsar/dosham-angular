import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { IEntry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private _requestService: ApiRequestService) { }

  Search(s: string) {

  }

  async GetRandoms(count: number) {
    const data = await this._requestService.getRandomEntriesRequest(count);
    if (!data.success) {
      throw "No data received from the GraphQL";
    }

    // Deserialize the serialized data
    const entries: IEntry[] = JSON.parse(data.serializedData);
    return entries;
  }
}
