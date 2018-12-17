import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCandidateDialogComponent } from './new-candidate-dialog.component';

describe('NewCandidateDialogComponent', () => {
  let component: NewCandidateDialogComponent;
  let fixture: ComponentFixture<NewCandidateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCandidateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCandidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
