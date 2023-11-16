import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSelectorDialogComponent } from './word-selector-dialog.component';

describe('WordSelectorDialogComponent', () => {
  let component: WordSelectorDialogComponent;
  let fixture: ComponentFixture<WordSelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordSelectorDialogComponent]
    });
    fixture = TestBed.createComponent(WordSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
