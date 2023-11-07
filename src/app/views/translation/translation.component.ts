import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITranslation } from 'src/app/models/translation.model';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {

  @Input() translation?: ITranslation;
  @Output() promote = new EventEmitter<void>();

  canPromote(rate: number, userId: string): boolean {
    // Add logic to determine if the user can promote this translation
    return true; // Placeholder return
  }

  doSearch(): void {
    // Implement search logic here
  }

  promoteTranslation(): void {

  }
}
