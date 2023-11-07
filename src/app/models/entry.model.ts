import { ITranslation } from "./translation.model";

export interface IEntry {
  EntryId: string;
  UserId: string;
  SourceId: string;
  ParentEntryId?: string;
  Content: string;
  Rate: number;
  CreatedAt: string;
  UpdatedAt: string;
  Type: number;
  Translations: ITranslation[];
}

export enum EntryType {
  Word = 1,
  Phrase = 2,
  Text = 3
}