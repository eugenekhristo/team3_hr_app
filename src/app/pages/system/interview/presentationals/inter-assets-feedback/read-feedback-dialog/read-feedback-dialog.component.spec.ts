import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFeedbackDialogComponent } from './read-feedback-dialog.component';

describe('ReadFeedbackDialogComponent', () => {
  let component: ReadFeedbackDialogComponent;
  let fixture: ComponentFixture<ReadFeedbackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFeedbackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
