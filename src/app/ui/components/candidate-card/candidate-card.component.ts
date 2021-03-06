import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'hr-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {
  @Input() candidate: Candidate;
  @Input() isCardChoosen = false;
  @Input() shouldShowImage = true;
  @Input() shouldShowDeleteTooltip = true;
  @Input() deleteTooltipMessage = '';
  @Input() styleForVacancy = false;

  @Output() goToCandidatePage = new EventEmitter<number>();
  @Output() deleteCandidate = new EventEmitter<number>();
  @Output() candidatesIdPicked = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {}

  toggleCardIsChoosen() {
    if (this.styleForVacancy) {
      this.isCardChoosen = !this.isCardChoosen;
    }
  }

}
