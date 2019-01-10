import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateContactsComponent } from './candidate-contacts.component';

describe('CandidateContactsComponent', () => {
  let component: CandidateContactsComponent;
  let fixture: ComponentFixture<CandidateContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
