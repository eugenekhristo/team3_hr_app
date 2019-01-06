import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCvComponent } from './timeline-cv.component';

describe('TimelineCvComponent', () => {
  let component: TimelineCvComponent;
  let fixture: ComponentFixture<TimelineCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
