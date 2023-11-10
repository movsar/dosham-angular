import { EntryType } from './entry.model';

export interface IEntryFilters {
  startsWith?: string;
  includeOnModeration?: boolean;
  entryTypes?: EntryType[];
}