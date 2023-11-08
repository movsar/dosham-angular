import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
  @Input() entry?: IEntry;
  @Output() pronunciationRequested = new EventEmitter<void>();

  public get Subheader(): string {
    const sourceNameTranslation = this.parseSource(this.entry?.Source.Name!)!;
    return sourceNameTranslation;
  }

  // This method will emit the pronunciationRequested event which you can bind to a method in your parent component
  listenToPronunciation() {
    this.pronunciationRequested.emit();
  }

  promoteEntry() {
    // implement your promotion logic
  }

  promoteTranslation(translation: any) {
    // implement your promotion logic for the translation
  }

  remove() {
    // implement your removal logic
  }

  share() {
    // implement your share logic
  }

  parseSource(sourceName: string): string | null {
    let sourceTitle: string | null = null;
    switch (sourceName) {
      case "Maciev":
        sourceTitle = "Чеченско - русский словарь, А.Г.Мациева";
        break;
      case "Karasaev":
        sourceTitle = "Русско - чеченский словарь, Карасаев А.Т., Мациев А.Г.";
        break;
      case "User":
        sourceTitle = "Добавлено пользователем";
        break;
      case "Malaev":
        sourceTitle = "Чеченско - русский словарь, Д.Б. Малаева";
        break;
      case "Anatslovar":
        sourceTitle = "Чеченско-русский, русско-чеченский словарь анатомии человека, Р.У. Берсанова";
        break;
      case "ikhasakhanov":
        sourceTitle = "Ислам Хасаханов";
        break;
    }
    return sourceTitle;
  }
}
