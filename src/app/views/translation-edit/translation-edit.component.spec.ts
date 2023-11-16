import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationEditComponent } from './translation-edit.component';

describe('TranslationEditComponent', () => {
  let component: TranslationEditComponent;
  let fixture: ComponentFixture<TranslationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationEditComponent]
    });
    fixture = TestBed.createComponent(TranslationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
