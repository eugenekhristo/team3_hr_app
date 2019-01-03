import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEditDialogComponent } from './feedback-edit-dialog.component';

describe('FeedbackEditDialogComponent', () => {
  let component: FeedbackEditDialogComponent;
  let fixture: ComponentFixture<FeedbackEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
