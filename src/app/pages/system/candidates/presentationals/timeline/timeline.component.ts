import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  Candidate,
  TIMELINE_ITEM_TYPE,
  TimelineNote
} from 'src/app/core/models/candidate.model';
import { Feedback } from 'src/app/core/models/feedback.model';
import { CV } from 'src/app/core/models/cv.model';

@Component({
  selector: 'hr-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input() candidate$: Observable<Candidate>;

  @Output() addNote = new EventEmitter<void>();
  @Output() deleteNote = new EventEmitter<TimelineNote>();
  @Output() changeNote = new EventEmitter<TimelineNote>();

  @Output() deleteCV = new EventEmitter<CV>();
  @Output() addCV = new EventEmitter<CV>();

  @Output() addInterview = new EventEmitter<Candidate>();

  @Output() changeFeedback = new EventEmitter<Feedback>();

  subscriptionContainer = new Subscription();

  timeline: object[];
  candidate: Candidate;
  TIMELINE_ITEM_TYPE = TIMELINE_ITEM_TYPE;

  constructor() {}

  ngOnInit() {
    this.candidate$.subscribe(
      candidate => {
        if (candidate) {
          this.candidate = candidate;
          this.timeline = candidate.timeline;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
  }

  onDeleteNote(note: TimelineNote) {
    this.deleteNote.emit(note);
  }

  onChangeNote(note: TimelineNote) {
    this.changeNote.emit(note);
  }

  onAddNote() {
    this.addNote.emit();
  }

  onAddInterview() {
    this.addInterview.emit(this.candidate);
  }
}
