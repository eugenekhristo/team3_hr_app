import {Component, OnInit} from '@angular/core';
import {CandidateService} from '../../../../core/services/candidate.service';
import {Observable} from 'rxjs';
import {Candidate} from '../../../../core/models/candidate.model';

@Component({
  selector: 'hr-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {

  candidates$: Observable<Candidate[]>;

  constructor(private candidatesService: CandidateService) {
  }

  ngOnInit() {
    this.candidates$ = this.candidatesService.fetch();
  }

}
