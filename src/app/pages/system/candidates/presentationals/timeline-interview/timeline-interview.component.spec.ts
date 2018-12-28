import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineInterviewComponent } from './timeline-interview.component';

describe('TimelineInterviewComponent', () => {
  let component: TimelineInterviewComponent;
  let fixture: ComponentFixture<TimelineInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
