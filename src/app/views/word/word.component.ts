import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent {
  @Input() entry?: IEntry;
  @Output() pronunciationRequested = new EventEmitter<void>();

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
}
