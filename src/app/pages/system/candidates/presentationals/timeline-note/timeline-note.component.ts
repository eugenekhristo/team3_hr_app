import { Component, OnInit, Input } from '@angular/core';
import { TimelineNote } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-timeline-note',
  templateUrl: './timeline-note.component.html',
  styleUrls: ['./timeline-note.component.scss']
})
export class TimelineNoteComponent implements OnInit {
  @Input() note: TimelineNote;

  constructor() { }

  ngOnInit() {
  }

}
