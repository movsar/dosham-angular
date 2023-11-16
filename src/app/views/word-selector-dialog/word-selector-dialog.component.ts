import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntrySelectorDialogComponent } from './../entry-selector-dialog/entry-selector-dialog.component';

@Component({
  selector: 'app-word-selector-dialog',
  templateUrl: './word-selector-dialog.component.html',
  styleUrls: ['./word-selector-dialog.component.scss']
})
export class WordSelectorDialogComponent {
  constructor(private dialog: MatDialog) { }

  openEntrySelectorDialog(): void {
    const dialogRef = this.dialog.open(EntrySelectorDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result is the selected EntryModel
      } else {
        // Handle cancellation
      }
    });
  }
}
