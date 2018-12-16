import * as moment from 'moment';
import { Component, OnInit, Inject } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate.model';
import { Subject } from 'rxjs';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { Vacancy } from 'src/app/core/models/vacancy.model';
import { VacancyService } from 'src/app/core/services/vacancy.service';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { INTERVIEW_DIALOG_TYPES } from '../interview-dialog-types';


@Component({
  selector: 'hr-interview-dialog',
  templateUrl: './interview-dialog.component.html',
  styleUrls: ['./interview-dialog.component.scss']
})
export class InterviewDialogComponent implements OnInit {
  INTERVIEW_DIALOG_TYPES = INTERVIEW_DIALOG_TYPES;
  candidates: Candidate[];
  vacancies: Vacancy[];
  candidateSearchTerm$ = new Subject<string>();
  vacancySearchTerm$ = new Subject<string>();

  get date() {
    return this.data.interview.date;
  }

  set date(date) {
    this.data.interview.date = moment(date).format('YYYY-MM-DD');
  }

  constructor(
    private candidateService: CandidateService,
    private vacancyService: VacancyService,
    @Inject(MAT_DIALOG_DATA) public data: {interview: InterviewClient, type: INTERVIEW_DIALOG_TYPES}
  ) {}

  ngOnInit() {
    this.candidateService
      .search(this.candidateSearchTerm$)
      .subscribe(candidates => (this.candidates = candidates));

    this.vacancyService
      .search(this.vacancySearchTerm$)
      .subscribe(vacancies => (this.vacancies = vacancies));
  }

  matDisplayCandidateFn(candidate?: Candidate): string | undefined {
    return candidate ? `${candidate.name} ${candidate.surname}` : undefined;
  }

  matDisplayVacancyFn(vacancy?: Vacancy): string | undefined {
    return vacancy ? vacancy.title : undefined;
  }
}
