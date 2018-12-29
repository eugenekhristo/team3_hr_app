import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from '../../../interview/presentationals/questionnaire/questionnaire.component';

@Component({
  selector: 'hr-timeline-feedback',
  templateUrl: './timeline-feedback.component.html',
  styleUrls: ['./timeline-feedback.component.scss']
})
export class TimelineFeedbackComponent implements OnInit {
  @Input() feedback: Feedback;

  constructor() { }

  ngOnInit() {
  }

}
