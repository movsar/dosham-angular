import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() selectedPage = new EventEmitter<number>();

  constructor() {}

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.selectedPage.emit(this.currentPage);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.selectedPage.emit(this.currentPage);
    }
  }
}
