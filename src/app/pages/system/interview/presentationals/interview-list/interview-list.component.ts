import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';

@Component({
  selector: 'hr-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewListComponent implements OnInit {
  @Input() interviews: InterviewClient[];

  constructor() { }

  ngOnInit() {
  }

}
