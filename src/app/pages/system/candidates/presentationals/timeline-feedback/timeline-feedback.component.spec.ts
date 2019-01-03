import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFeedbackComponent } from './timeline-feedback.component';

describe('TimelineFeedbackComponent', () => {
  let component: TimelineFeedbackComponent;
  let fixture: ComponentFixture<TimelineFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
