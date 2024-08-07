import { Component, OnInit } from '@angular/core';
import { EntryType, Entry } from 'src/app/models/entry.model';
import { IFiltrationFlags } from 'src/app/models/filtration-flags.model';
import { ContentStoreService } from 'src/app/services/content-store.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public _letters = ['Ӏ', 'А', 'Аь', 'Б', 'В', 'Г', 'ГӀ', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Кх', 'Къ', 'КӀ', 'Л', 'М', 'Н', 'О', 'Оь', 'П', 'ПӀ', 'Р', 'С', 'Т', 'ТӀ', 'У', 'Уь', 'Ф', 'Х', 'Хь', 'ХӀ', 'Ц', 'ЦӀ', 'Ч', 'ЧӀ', 'Ш', 'Э', 'Ю', 'Юь', 'Я', 'Яь'];
  _entries?: Entry[];
  _currentPage = 1;
  _totalPages: number = 0;
  _currentLetter: string = this._letters[0];

  constructor(private _contentStore: ContentStoreService) {}

  ngOnInit(): void {
    this._contentStore.setCurrentEntries([]);
    this.letterSelectionHandler(this._letters[0]);
  }

  async letterSelectionHandler(letter: string): Promise<void> {
    this._currentPage = 1;
    this._currentLetter = letter;

    const filtrationFlags: IFiltrationFlags = {
      entryFilters: {
        includeOnModeration: false,
        startsWith: this._currentLetter,
        entryTypes: [EntryType.Word],
      },
    };

    try {
      const count = await this._contentStore.entryService.getCount(filtrationFlags);
      this._totalPages = Math.ceil(count / 50);

      await this.getEntries();
    } catch (error) {
      console.error('Error fetching entry count:', error);
    }
  }

  async selectPage(page: number): Promise<void> {
    this._currentPage = page;
    await this.getEntries();
  }

  private async getEntries(){
    const filtrationFlags: IFiltrationFlags = {
      entryFilters: {
        includeOnModeration: false,
        startsWith: this._currentLetter,
        entryTypes: [EntryType.Word],
      },
    };

    this._entries = await this._contentStore.entryService.take((this._currentPage - 1) * 50, 50, filtrationFlags);
    this._contentStore.setCurrentEntries(this._entries);
  }
}
