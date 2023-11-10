import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { IFiltrationFlags } from '../models/filtration-flags.model';
import { IEntry } from '../models/entry.model';
import { RecordType } from '../enums/record-type.enum';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor(private requestService: ApiRequestService) {}

  async getCount(filtrationFlags: IFiltrationFlags) {
    const data = await this.requestService.getCount(RecordType.Entry, filtrationFlags);
    if (!data.success) {
      throw "No data received from the GraphQL";
    }
    const count: number = JSON.parse(data.serializedData);
    return count;
  }

  async take(offset: number, limit: number, filtrationFlags: IFiltrationFlags ) {
    const data = await this.requestService.take(RecordType.Entry, offset, limit, filtrationFlags);
    if (!data.success) {
      throw "No data received from the GraphQL";
    }

    const entries: IEntry[] = JSON.parse(data.serializedData);
    return entries;
  }
}
