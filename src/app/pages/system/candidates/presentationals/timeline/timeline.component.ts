import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Candidate,
  TIMELINE_ITEM_TYPE,
  TimelineNote
} from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() candidate$: Observable<Candidate>;
  @Output() deleteNote = new EventEmitter<TimelineNote>();
  @Output() addNote = new EventEmitter<void>();
  @Output() addInterview = new EventEmitter<Candidate>();

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

  onDeleteNote(note: TimelineNote) {
    this.deleteNote.emit(note);
  }

  onAddNote() {
    this.addNote.emit();
  }

  onAddInterview() {
    this.addInterview.emit(this.candidate);
  }
}

// window.addEventListener('paste', e => {
//   targetImg.src = e.clipboardData.getData('Text');
//     // console.log(e.clipboardData.getData('Text'));

// });
