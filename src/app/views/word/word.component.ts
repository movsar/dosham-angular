import { Input, Component } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent {
  @Input() entry?: IEntry;
}
