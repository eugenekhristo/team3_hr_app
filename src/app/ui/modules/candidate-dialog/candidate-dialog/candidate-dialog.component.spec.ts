import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDialogComponent } from './candidate-dialog.component';

describe('CandidateDialogComponent', () => {
  let component: CandidateDialogComponent;
  let fixture: ComponentFixture<CandidateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
