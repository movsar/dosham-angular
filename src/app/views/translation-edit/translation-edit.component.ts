import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ITranslation } from 'src/app/models/translation.model';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-translation-edit',
  templateUrl: './translation-edit.component.html',
  styleUrls: ['./translation-edit.component.scss']
})
export class TranslationEditComponent {
  @Input() translation!: ITranslation

  @Output() remove = new EventEmitter<string>();
  @Output() promote = new EventEmitter<ITranslation>();
  canEditTranslation: boolean = true;
  canRemoveTranslation: boolean = false;

  constructor(private userStore: UserStoreService) { } // Assuming UserStore is a service

  ngOnInit(): void {
    this.checkPermissions();
  }

  checkPermissions(): void {
    // if (this.translation.CreatedAt !== DateTimeOffset.MinValue) {
    //   this.canEditTranslation = false;
    //   this.canRemoveTranslation = this.userStore.CurrentUser?.CanRemove(this.translation.Rate, this.translation.UserId, this.translation.CreatedAt) === true;
    // }
  }

  editHandler(): void {
    this.canEditTranslation = this.userStore.CurrentUser?.CanEdit(this.translation.Rate, this.translation.UserId!) === true;
  }

  promoteHandler(): void {
    this.promote.emit(this.translation);
  }

  removeHandler(): void {
    this.remove.emit(this.translation.TranslationId);
  }
}
