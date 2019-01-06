import * as moment from 'moment';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate.model';
import { Subject } from 'rxjs';
import { CandidateService } from 'src/app/core/services/candidate.service';
import { Vacancy } from 'src/app/core/models/vacancy.model';
import { VacancyService } from 'src/app/core/services/vacancy.service';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { INTERVIEW_DIALOG_TYPES } from '../interview-dialog-types';
import { NgModel, AbstractControl } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'hr-interview-dialog',
  templateUrl: './interview-dialog.component.html',
  styleUrls: ['./interview-dialog.component.scss']
})
export class InterviewDialogComponent implements OnInit {
  INTERVIEW_DIALOG_TYPES = INTERVIEW_DIALOG_TYPES;
  candidates: Candidate[];
  vacancies: Vacancy[];
  interviewers: User[];
  candidateSearchTerm$ = new Subject<string>();
  vacancySearchTerm$ = new Subject<string>();
  interviewerSearchTerm$ = new Subject<string>();
  @ViewChild('vacanyInput') vacanyInput: NgModel;
  @ViewChild('candidateInput') candidateInput: NgModel;
  @ViewChild('interviewerInput') interviewerInput: NgModel;
  @ViewChild('timeStart') timeStartInpit: NgModel;
  @ViewChild('timeEnd') timeEndInput: NgModel;

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

  get interviewer() {
    return this.data.interview.interviewer;
  }

  set interviewer(interviewer: User) {
    this.data.interview.interviewer = interviewer;
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

  get place() {
    return this.interview.place;
  }

  set place(value: string) {
    this.interview.place = value;
  }

  constructor(
    private candidateService: CandidateService,
    private vacancyService: VacancyService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA)
    public data: { interview: InterviewClient; type: INTERVIEW_DIALOG_TYPES }
  ) {}

  ngOnInit() {
    this.candidateService
      .search(this.candidateSearchTerm$)
      .subscribe(candidates => (this.candidates = candidates));

    this.vacancyService.search(this.vacancySearchTerm$).subscribe(vacancies => {
      this.vacancies = vacancies;
    });

    this.userService.search(this.interviewerSearchTerm$).subscribe(interviewers => {
      this.interviewers = interviewers;
    });

    this.setCustomValidator(this.vacanyInput);
    this.setCustomValidator(this.candidateInput);
    this.setCustomValidator(this.interviewerInput);
    this.setEndTimeValidator();
  }

  matDisplayCandidateFn(candidate?: Candidate): string | undefined {
    return candidate ? `${candidate.name} ${candidate.surname}` : undefined;
  }

  matDisplayInterviewerFn(interviewer?: User): string | undefined {
    return interviewer ? `${interviewer.name} ${interviewer.surname}` : undefined;
  }

  matDisplayVacancyFn(vacancy?: Vacancy): string | undefined {
    return vacancy ? vacancy.title : undefined;
  }

  private setCustomValidator(inp: NgModel) {
    const input = inp.control;
    input.setValidators(
      (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value && control.value.id) {
          return null;
        } else {
          return { notChoosen: true };
        }
      }
    );
  }

  private setEndTimeValidator() {
    const endInput = this.timeEndInput.control;

    endInput.setValidators(
      (control: AbstractControl): { [key: string]: any } | null => {
        if (this.timeStartInpit.value < control.value) {
          return null;
        } else {
          return { wrongEndTime: true };
        }
      }
    );
  }

  private predictTitle() {
    const titleArr = [];

    if (this.interview.candidate && this.interview.candidate.name) {
      titleArr[0] = `${this.interview.candidate.name} ${
        this.interview.candidate.surname
      }`;
    }

    if (this.interview.vacancy && this.interview.vacancy.title) {
      titleArr[1] = `on ${this.interview.vacancy.title}`;
    }

    const title = titleArr.join(' ');

    this.interview.title = title;
  }
}
