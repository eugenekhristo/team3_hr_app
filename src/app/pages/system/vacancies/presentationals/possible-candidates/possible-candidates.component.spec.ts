import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleCandidatesComponent } from './possible-candidates.component';

describe('PossibleCandidatesComponent', () => {
  let component: PossibleCandidatesComponent;
  let fixture: ComponentFixture<PossibleCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossibleCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
