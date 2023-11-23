import { ISound } from "./sound.model";
import { ISource } from "./source.model";
import { Translation } from "./translation.model";

export class Entry {
  private _content: string = '';
  private _type: number = 1;

  public EntryId: string = crypto.randomUUID();
  public Source: any;
  public SourceId!: string;

  public UserId: string = "";
  public ParentEntryId?: string;
  public Rate: number = 0;
  public Subtype: number = 0;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
  public Details?: string;

  SubEntries: Entry[] = [];
  Sounds: ISound[] = [];
  Translations: Translation[] = [];

  public get Content(): string {
    return this._content;
  }

  public set Content(value) {
    const trimmedValue = value.trim();
    if (trimmedValue.includes(' ') || trimmedValue.includes('.') || trimmedValue.includes(',')) {
      this._type = trimmedValue.length > 255 ? EntryType.Text : EntryType.Phrase;
    } else {
      this._type = EntryType.Word;
    }
    this._content = value;
  }

  public get Type(): number {
    return this._type;
  }

  public set Type(value: number) {
    this._type = value;
  }

}

export enum EntryType {
  Word = 1,
  Phrase = 2,
  Text = 3
}
