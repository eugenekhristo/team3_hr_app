import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterAssetsFeedbackComponent } from './inter-assets-feedback.component';

describe('InterAssetsFeedbackComponent', () => {
  let component: InterAssetsFeedbackComponent;
  let fixture: ComponentFixture<InterAssetsFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterAssetsFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterAssetsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
