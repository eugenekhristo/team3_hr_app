import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';

@Component({
  selector: 'hr-interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss']
})
export class InterviewCardComponent implements OnInit {
  @Input() interview: InterviewClient;
  @Output() deleteInterview = new EventEmitter<InterviewClient>();

  constructor() { }

  ngOnInit() {
  }
}
