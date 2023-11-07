import { Input, Component } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent {
  @Input() entry?: IEntry;
}
