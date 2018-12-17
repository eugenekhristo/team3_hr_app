import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CandidateService} from '../../../../core/services/candidate.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Candidate} from '../../../../core/models/candidate.model';
import {InterviewService} from '../../shared/services/interview.service';

@Component({
  selector: 'hr-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit {
  interviews = [];
  isNew = true;
  candidate: Candidate;

  constructor(private route: ActivatedRoute,
              private candidatesService: CandidateService,
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.candidatesService.getById(params['id']);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (candidate: Candidate) => {
          if (candidate) {
            this.candidate = candidate;
          }

        }
      );
  }

}
