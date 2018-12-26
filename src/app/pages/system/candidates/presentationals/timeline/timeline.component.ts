import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Candidate,
  TIMELINE_ITEM_TYPE
} from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() candidate$: Observable<Candidate>;
  timeline: object[];
  TIMELINE_ITEM_TYPE = TIMELINE_ITEM_TYPE;

  constructor() {}

  ngOnInit() {
    this.candidate$.subscribe(
      candidate => {
        this.timeline = candidate.timeline;
        console.log(this.timeline);
      }
    );
  }
}

// window.addEventListener('paste', e => {
//   targetImg.src = e.clipboardData.getData('Text');
//     // console.log(e.clipboardData.getData('Text'));

// });
