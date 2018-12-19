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
import { join } from 'path';

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

  get interview() {
    return this.data.interview;
  }

  get candidate() {
    return this.data.interview.candidate;
  }

  set candidate(candidate: Candidate) {
    this.data.interview.candidate = candidate;
    this.predictTitle();
  }

  get vacancy() {
    return this.data.interview.vacancy;
  }

  set vacancy(vacancy: Vacancy) {
    this.data.interview.vacancy = vacancy;
    this.predictTitle();
  }

  get title() {
    return this.interview.title;
  }

  set title(title: string) {
    this.interview.title = title;
  }

  get date() {
    return this.data.interview.start.substr(0, 10);
  }

  set date(date) {
    this.data.interview.start =
      moment(date).format('YYYY-MM-DD') +
      ' ' +
      this.data.interview.start.substr(11);
    this.data.interview.end =
      moment(date).format('YYYY-MM-DD') +
      ' ' +
      this.data.interview.end.substr(11);
  }

  get startTime() {
    return this.data.interview.start.substr(11);
  }

  set startTime(time) {
    this.data.interview.start =
      this.data.interview.start.substr(0, 10) + ` ${time}`;
  }

  get endTime() {
    return this.data.interview.end.substr(11);
  }

  set endTime(time) {
    this.data.interview.end =
      this.data.interview.end.substr(0, 10) + ` ${time}`;
  }

  constructor(
    private candidateService: CandidateService,
    private vacancyService: VacancyService,
    @Inject(MAT_DIALOG_DATA)
    public data: { interview: InterviewClient; type: INTERVIEW_DIALOG_TYPES }
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

  private predictTitle() {
    const titleArr = [];

    if (this.interview.candidate && this.interview.candidate.name) {
      titleArr[0] = `${this.interview.candidate.name} ${this.interview.candidate.surname}`;
    }

    if (this.interview.vacancy && this.interview.vacancy.title) {
      titleArr[1] = `on ${this.interview.vacancy.title}`;
    }

    const title = titleArr.join(' ');

    this.interview.title = title;

  }
}
