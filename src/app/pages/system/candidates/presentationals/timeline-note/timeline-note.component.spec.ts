import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineNoteComponent } from './timeline-note.component';

describe('TimelineNoteComponent', () => {
  let component: TimelineNoteComponent;
  let fixture: ComponentFixture<TimelineNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
