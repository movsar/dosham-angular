import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySelectorDialogComponent } from './entry-selector-dialog.component';

describe('EntrySelectorDialogComponent', () => {
  let component: EntrySelectorDialogComponent;
  let fixture: ComponentFixture<EntrySelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrySelectorDialogComponent]
    });
    fixture = TestBed.createComponent(EntrySelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
