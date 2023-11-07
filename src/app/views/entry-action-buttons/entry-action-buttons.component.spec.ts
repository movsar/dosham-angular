import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryActionButtonsComponent } from './entry-action-buttons.component';

describe('EntryActionButtonsComponent', () => {
  let component: EntryActionButtonsComponent;
  let fixture: ComponentFixture<EntryActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryActionButtonsComponent]
    });
    fixture = TestBed.createComponent(EntryActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
