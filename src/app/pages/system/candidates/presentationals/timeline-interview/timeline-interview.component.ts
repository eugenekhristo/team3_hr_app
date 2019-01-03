import { Component, OnInit, Input } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';

@Component({
  selector: 'hr-timeline-interview',
  templateUrl: './timeline-interview.component.html',
  styleUrls: ['./timeline-interview.component.scss']
})
export class TimelineInterviewComponent implements OnInit {
  @Input() interview: InterviewClient;

  constructor() { }

  ngOnInit() {
  }

}
