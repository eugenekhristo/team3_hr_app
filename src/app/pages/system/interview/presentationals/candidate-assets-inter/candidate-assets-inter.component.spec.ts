import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAssetsInterComponent } from './candidate-assets-inter.component';

describe('CandidateAssetsInterComponent', () => {
  let component: CandidateAssetsInterComponent;
  let fixture: ComponentFixture<CandidateAssetsInterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAssetsInterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAssetsInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
