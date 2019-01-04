import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineNote } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-timeline-note',
  templateUrl: './timeline-note.component.html',
  styleUrls: ['./timeline-note.component.scss']
})
export class TimelineNoteComponent implements OnInit {
  @Input() note: TimelineNote;
  @Output() deleteNote = new EventEmitter<TimelineNote>();
  @Output() changeNote = new EventEmitter<TimelineNote>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.deleteNote.emit(this.note);
  }

  onChange() {
    this.changeNote.emit(this.note);
  }
}
