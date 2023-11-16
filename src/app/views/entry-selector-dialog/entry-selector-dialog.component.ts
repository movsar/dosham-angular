import { Component, Output, EventEmitter } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';
\
@Component({
  selector: 'app-entry-selector-dialog',
  templateUrl: './entry-selector-dialog.component.html',
  styleUrls: ['./entry-selector-dialog.component.scss']
})
export class EntrySelectorDialogComponent {
  selectedEntry: IEntry | undefined = undefined;
  @Output() confirm = new EventEmitter<IEntry | undefined>();
  @Output() cancel = new EventEmitter<void>();

  ok(): void {
    this.confirm.emit(this.selectedEntry);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  handleEntrySelected(event: any): void {
    this.selectedEntry = event;
  }
}
