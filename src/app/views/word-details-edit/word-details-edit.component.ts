import { Component, Input, Output } from '@angular/core';
import { VerbTense } from 'src/app/enums/word-details.enum';
import { WordType } from 'src/app/enums/word-type.enum';
import { IEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-word-details-edit',
  templateUrl: './word-details-edit.component.html',
  styleUrls: ['./word-details-edit.component.scss']
})
export class WordDetailsEditComponent {
  @Input() entry!: IEntry | undefined;
  @Input() disabled: boolean = false;

  parentEntry: IEntry | undefined;
  wordTypes = WordType;
  verbTenses = VerbTense;

  constructor() { }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    // Initialization logic, like fetching data if needed
  }

  setParentWord(): void {
    // Logic to set the parent word
  }

}
