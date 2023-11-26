import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { IFiltrationFlags } from '../models/filtration-flags.model';
import { Entry } from '../models/entry.model';
import { RecordType } from '../enums/record-type.enum';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  filtrationFlagsForModeratedEntries: IFiltrationFlags = {
    entryFilters: {
      includeOnModeration: false,
    },
    translationFilters: {
      includeOnModeration: false
    }
  };

  constructor(private _requestService: ApiRequestService) {}

  async search(s: string) {

    const data = await this._requestService.findEntriesRequest(s);
    if (!data.success) {
      throw 'No data received from the GraphQL';
    }

    const entries: Entry[] = JSON.parse(data.serializedData);
    return entries;
  }

  async getLatest(count: number) {
    const data = await this._requestService.getLatestEntriesRequest(count);
    if (!data.success) {
      throw 'No data received from the GraphQL';
    }

    const entries: Entry[] = JSON.parse(data.serializedData);
    return entries;
  }

  async getRandoms(count: number) {
    const data = await this._requestService.getRandomEntriesRequest(count);
    if (!data.success) {
      throw 'No data received from the GraphQL';
    }

    const entries: Entry[] = JSON.parse(data.serializedData);
    return entries;
  }

  async getCount(filtrationFlags: IFiltrationFlags) {
    const data = await this._requestService.getCountRequest(
      RecordType.Entry,
      filtrationFlags
    );
    if (!data.success) {
      throw 'No data received from the GraphQL';
    }
    const count: number = JSON.parse(data.serializedData);
    return count;
  }

  async take(offset: number, limit: number, filtrationFlags: IFiltrationFlags) {
    const data = await this._requestService.takeRequest(
      RecordType.Entry,
      offset,
      limit,
      filtrationFlags
    );
    if (!data.success) {
      throw 'No data received from the GraphQL';
    }

    const entries: Entry[] = JSON.parse(data.serializedData);
    return entries;
  }
}
