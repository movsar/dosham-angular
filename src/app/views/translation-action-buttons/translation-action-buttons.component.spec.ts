import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationActionButtonsComponent } from './translation-action-buttons.component';

describe('TranslationActionButtonsComponent', () => {
  let component: TranslationActionButtonsComponent;
  let fixture: ComponentFixture<TranslationActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationActionButtonsComponent]
    });
    fixture = TestBed.createComponent(TranslationActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
