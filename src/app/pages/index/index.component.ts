import { Component, OnInit } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';
import { ContentStoreService } from 'src/app/services/content-store.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  letters = ['Ӏ', 'А', 'Аь', 'Б', 'В', 'Г', 'ГӀ', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Кх', 'Къ', 'КӀ', 'Л', 'М', 'Н', 'О', 'Оь', 'П', 'ПӀ', 'Р', 'С', 'Т', 'ТӀ', 'У', 'Уь', 'Ф', 'Х', 'Хь', 'ХӀ', 'Ц', 'ЦӀ', 'Ч', 'ЧӀ', 'Ш', 'Э', 'Ю', 'Юь', 'Я', 'Яь'];
  entries?: IEntry[]; // Define EntryModel interface based on the Blazor model
  currentPage = 1;
  totalPages: number = 0;
  currentLetter: string = this.letters[0];

  constructor(private contentStore: ContentStoreService) {}

  ngOnInit(): void {
    this.letterSelectionHandler(this.letters[0]);
  }

  async letterSelectionHandler(letter: string): Promise<void> {
    // ... Angular service calls to replace C# async methods
  }

  async selectPage(page: number): Promise<void> {
    // ... Angular service calls to replace C# async methods
  }
}
