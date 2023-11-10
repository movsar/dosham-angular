import { IEntryFilters } from './entry-filters.model';
import { ITranslationFilters } from './translation-filters.model';

export interface IFiltrationFlags {
  entryFilters?: IEntryFilters;
  translationFilters?: ITranslationFilters;
}