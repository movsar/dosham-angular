import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryEditComponent } from './entry-edit.component';

describe('EntryEditComponent', () => {
  let component: EntryEditComponent;
  let fixture: ComponentFixture<EntryEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryEditComponent]
    });
    fixture = TestBed.createComponent(EntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
