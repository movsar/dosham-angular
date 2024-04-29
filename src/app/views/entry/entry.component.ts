import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WordType } from 'src/app/enums/word-type.enum';
import { Entry } from 'src/app/models/entry.model';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  @Input() Entry!: Entry;
  @Output() pronunciationRequested = new EventEmitter<void>();

  constructor(public UserStore: UserStoreService){}

  public get Header(): string {
    let header: string = this.Entry.Content; // Assuming Entry and Content can't be null/undefined
    let className: string = '';

    if (this.Entry.Details) {
      let details: any = this.Entry.Details;

      switch (this.Entry.Subtype) {
        case WordType.Noun:
          if (details && details.Class !== 0) {
            className = this.grammaticalClassToString(details.Class);
          }
          break;

        case WordType.Verb:
          // Verb case logic goes here
          break;

        default:
          break;
      }
      if (className !== '') {
        header = `${header} ${className}`;
      }
    }
    return header;
  }

  public get Subheader(): string {
      return '';
  }

  // This method will emit the pronunciationRequested event which you can bind to a method in your parent component
  listenToPronunciation() {
    this.pronunciationRequested.emit();
  }

  promoteEntry() {
    // implement your promotion logic
    //            await ContentStore.EntryService.PromoteAsync(Entry, UserStore.CurrentUser);
  }

  promoteTranslation(translation: any) {
    // implement your promotion logic for the translation
    //            await ContentStore.EntryService.PromoteTranslationAsync(translation, UserStore.CurrentUser);
  }

  remove() {
    // implement your removal logic
    //            await ContentStore.EntryService.RemoveAsync(Entry, UserStore.CurrentUser.Id!);
  }

  share() {
    // implement your share logic
  }

  grammaticalClassToString(grammaticalClass: number): string {
    const classesMap: { [key: number]: string } = {
      1: 'в, б/д',
      2: 'й, б/д',
      3: 'й, й',
      4: 'д, д',
      5: 'б, б/й',
      6: 'б, д',
    };

    return classesMap[grammaticalClass] ?? '';
  }

  parseSource(sourceName: string): string | null {
    let sourceTitle: string | null = null;
    switch (sourceName) {
      case 'Maciev':
        sourceTitle = 'Чеченско - русский словарь, А.Г.Мациева';
        break;
      case 'Karasaev':
        sourceTitle = 'Русско - чеченский словарь, Карасаев А.Т., Мациев А.Г.';
        break;
      case 'User':
        sourceTitle = 'Добавлено пользователем';
        break;
      case 'Malaev':
        sourceTitle = 'Чеченско - русский словарь, Д.Б. Малаева';
        break;
      case 'Anatslovar':
        sourceTitle =
          'Чеченско-русский, русско-чеченский словарь анатомии человека, Р.У. Берсанова';
        break;
      case 'ikhasakhanov':
        sourceTitle = 'Ислам Хасаханов';
        break;
    }
    return sourceTitle;
  }
}
