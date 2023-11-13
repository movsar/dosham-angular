import { Component, Input } from '@angular/core';
import { ITranslation } from 'src/app/models/translation.model';
import { User } from 'src/app/models/user.model';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-translation-action-buttons',
  templateUrl: './translation-action-buttons.component.html',
  styleUrls: ['./translation-action-buttons.component.scss'],
})
export class TranslationActionButtonsComponent {
  @Input() Translation!: ITranslation; // Adjust the type as needed
  @Input() RemoveHandler!: Function;
  @Input() EditHandler!: Function;
  @Input() PromoteHandler!: Function;

  constructor(private userStore: UserStoreService) { }

  get CurrentUser(): User | undefined {
    // Replace 'any' with the actual type of your current user
    return this.userStore.CurrentUser;
  }
}
