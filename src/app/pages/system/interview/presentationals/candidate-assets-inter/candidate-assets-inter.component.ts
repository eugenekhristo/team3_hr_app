import { Component, OnInit, Input } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { TIMELINE_ITEM_TYPE } from 'src/app/core/models/candidate.model';
import { CandidateAssetsService } from './candidate-assests.service';

@Component({
  selector: 'hr-candidate-assets-inter',
  templateUrl: './candidate-assets-inter.component.html',
  styleUrls: ['./candidate-assets-inter.component.scss'],
  providers: [CandidateAssetsService]
})
export class CandidateAssetsInterComponent implements OnInit {
  @Input() interview: InterviewClient;
  timeline = [];
  TYPE = TIMELINE_ITEM_TYPE;

  constructor(private service: CandidateAssetsService) { }

  ngOnInit() {
    this.timeline = this.service.processTimeline(this.interview.candidate.timeline);
  }

}
