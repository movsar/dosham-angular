import { Component, Input } from '@angular/core';
import { Translation } from 'src/app/models/translation.model';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-translation-action-buttons',
  templateUrl: './translation-action-buttons.component.html',
  styleUrls: ['./translation-action-buttons.component.scss'],
})
export class TranslationActionButtonsComponent {
  @Input() translation!: Translation; // Adjust the type as needed
  @Input() removeHandler!: Function;
  @Input() editHandler!: Function;
  @Input() promoteHandler!: Function;

  constructor(public userStore: UserStoreService) { }

}
