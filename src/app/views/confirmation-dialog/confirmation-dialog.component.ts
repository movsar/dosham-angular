import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();

  ok(): void {
    this.confirm.emit(true);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
