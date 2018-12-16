import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate.model';
import { Subject } from 'rxjs';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { Vacancy } from 'src/app/core/models/vacancy.model';
import { VacancyService } from 'src/app/core/services/vacancy.service';
import { InterviewClient } from 'src/app/core/models/interview.model';

@Component({
  selector: 'hr-add-interview-dialog',
  templateUrl: './add-interview-dialog.component.html',
  styleUrls: ['./add-interview-dialog.component.scss']
})
export class AddInterviewDialogComponent implements OnInit {
  candidates: Candidate[];
  vacancies: Vacancy[];
  candidateSearchTerm$ = new Subject<string>();
  vacancySearchTerm$ = new Subject<string>();
  returnedInterview: InterviewClient = {
    candidate: '',
    vacancy: '',
    date: '',
    time: ''
  };

  get date() {
    return this.returnedInterview.date;
  }

  set date(date) {
    this.returnedInterview.date = moment(date).format('YYYY-MM-DD');
  }

  constructor(
    private candidateService: CandidateService,
    private vacancyService: VacancyService,
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
