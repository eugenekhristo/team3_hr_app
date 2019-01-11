import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPossibleCandidatesDialogComponent } from './add-possible-candidates-dialog.component';

describe('AddPossibleCandidatesDialogComponent', () => {
  let component: AddPossibleCandidatesDialogComponent;
  let fixture: ComponentFixture<AddPossibleCandidatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPossibleCandidatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPossibleCandidatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
