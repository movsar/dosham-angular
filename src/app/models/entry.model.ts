export interface IEntry {
  entryId: string;
  userId: string;
  sourceId: string;
  parentEntryId?: string;
  content: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  type: EntryType
}

export enum EntryType {
  Word = 1,
  Phrase = 2,
  Text = 3
}