import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSelectorComponent } from './word-selector.component';

describe('WordSelectorComponent', () => {
  let component: WordSelectorComponent;
  let fixture: ComponentFixture<WordSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordSelectorComponent]
    });
    fixture = TestBed.createComponent(WordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
