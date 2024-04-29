import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { EntryType, Entry } from 'src/app/models/entry.model';
import { Translation } from 'src/app/models/translation.model';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent {
  entryTypes = Object.entries(EntryType)
    .filter(([key, value]) => isNaN(Number(key)))
    .map(([key, value]) => ({ name: key, value: value }));

  type: EntryType = EntryType.Word;

  constructor(private _router: Router) { }

  cancel() {
    this._router.navigate(['/']);
  }

}
