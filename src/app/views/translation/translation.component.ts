import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Translation } from 'src/app/models/translation.model';
import { ContentStoreService } from 'src/app/services/content-store.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent {
  @Input() _translation?: Translation;
  @Output() promote = new EventEmitter<void>();

  constructor(private _contentStore: ContentStoreService) {}

  canPromote(rate: number, userId: string): boolean {
    // Add logic to determine if the user can promote this translation
    return false; // Placeholder return
  }

  async doSearch() {
    // Assuming Translation is an object with a property `Content` of type string
    let translationText = this._translation?.Content.toLowerCase()!;

    const prefixesToSearch: string[] = [
      'см',
      'понуд.? от',
      'потенц.? от',
      'прил.? к',
      'масд.? от',
    ];

    for (let prefix of prefixesToSearch) {
      const pattern = `(?<=${prefix}\\W?\\s?)[1ӀӏА-яA-z]+`;
      const match = translationText.match(new RegExp(pattern, 'u'));

      if (match) {
        const foundEntries = await this._contentStore.entryService.search(match[0]); // Assuming FindAsync is a method in your TypeScript code
        this._contentStore.setCurrentEntries(foundEntries);
      }
    }
  }

  promoteTranslation(): void {}
}
