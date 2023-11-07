import { Input, Component } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input() entry?: IEntry;
}
