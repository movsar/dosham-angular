import { EntryFilters } from './entry-filters.model';
import { TranslationFilters } from './translation-filters.model';

export interface IFiltrationFlags {
  entryFilters?: EntryFilters;
  translationFilters?: TranslationFilters;
}
