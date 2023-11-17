import { EntryType } from './entry.model';

export interface EntryFilters {
  startsWith?: string;
  includeOnModeration?: boolean;
  entryTypes?: EntryType[];
}
