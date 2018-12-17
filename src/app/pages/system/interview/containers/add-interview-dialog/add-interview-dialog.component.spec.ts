import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewDialogComponent } from './add-interview-dialog.component';

describe('AddInterviewDialogComponent', () => {
  let component: AddInterviewDialogComponent;
  let fixture: ComponentFixture<AddInterviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
