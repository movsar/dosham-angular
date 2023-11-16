import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDetailsEditComponent } from './word-details-edit.component';

describe('WordDetailsEditComponent', () => {
  let component: WordDetailsEditComponent;
  let fixture: ComponentFixture<WordDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordDetailsEditComponent]
    });
    fixture = TestBed.createComponent(WordDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
