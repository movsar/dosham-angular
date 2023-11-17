import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-entry-action-buttons',
  templateUrl: './entry-action-buttons.component.html',
  styleUrls: ['./entry-action-buttons.component.scss']
})
export class EntryActionButtonsComponent {
  @Input() entry?: Entry;
  @Output() promote = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  // Add any other outputs you need for your actions

  constructor(public _userStore: UserStoreService) { }

  get canPromote(): boolean {
    return false;//this.userService.canPromote(this.entry.rate, this.entry.userId);
  }

  get canRemove(): boolean {
    return false;// this.userService.canRemove(this.entry.rate, this.entry.userId, this.entry.createdAt);
  }

  promoteHandler() {
    this.promote.emit();
  }

  removeHandler() {
    this.remove.emit();
  }
}
