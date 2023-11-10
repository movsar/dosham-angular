import { ISound } from "./sound.model";
import { ISource } from "./source.model";
import { ITranslation } from "./translation.model";

export interface IEntry {
  EntryId: string;
  UserId: string;
  Source: ISource;
  Sounds: ISound[];
  SourceId: string;
  ParentEntryId?: string;
  Rate: number;
  Content: string;
  Type: number;
  Subtype: number;
  Details: {};
  SubEntries: IEntry[];
  CreatedAt: string;
  UpdatedAt: string;
  Translations: ITranslation[];
}

export enum EntryType {
  Word = 1,
  Phrase = 2,
  Text = 3
}