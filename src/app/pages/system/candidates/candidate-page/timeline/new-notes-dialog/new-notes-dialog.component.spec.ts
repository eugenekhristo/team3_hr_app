import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNotesDialogComponent } from './new-notes-dialog.component';

describe('NewNotesDialogComponent', () => {
  let component: NewNotesDialogComponent;
  let fixture: ComponentFixture<NewNotesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNotesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
