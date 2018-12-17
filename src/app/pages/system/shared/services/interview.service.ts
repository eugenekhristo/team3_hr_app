import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/app/core/constants/base-url';

import { Observable, from, forkJoin, of, Subject } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  mergeMap,
  bufferCount,
  delay
} from 'rxjs/operators';

import {
  Interview,
  InterviewClient
} from 'src/app/core/models/interview.model';

@Injectable()
export class InterviewService {
  private _interviewDates: string[];

  get interviewDates() {
    return this._interviewDates;
  }

  set interviewDates(dates: string[]) {
    this._interviewDates = dates;
  }

  interviewAdded$ = new Subject<InterviewClient>();

  constructor(private http: HttpClient) {}

  getInterviewsDates(): Observable<string[]> {
    return this.http.get<Interview[]>(`${BASE_URL}/interviews`).pipe(
      map(interviews => {
        return interviews.map(interview => interview.date);
      }),
      tap(dates => (this._interviewDates = dates))
    );
  }

  getInterviewsByDate(date: string): Observable<InterviewClient[]> {
    if (this._interviewDates && !this._interviewDates.includes(date)) {
      return of([]);
    }

    let interviewsCount = 0;
    const params = new HttpParams().set('date', date);
    return this.http
      .get<Interview[]>(`${BASE_URL}/interviews`, { params })
      .pipe(
        tap(interviews => {
          interviewsCount = interviews.length;
        }),
        switchMap(interviews => from(interviews)),
        mergeMap(interview => {
          return forkJoin(
            this.http.get(`${BASE_URL}/candidates/${interview.candidateId}`),
            this.http.get(`${BASE_URL}/vacancies/${interview.vacancyId}`)
          ).pipe(
            map(
              ([candidate, vacancy]) =>
                new InterviewClient(
                  candidate,
                  vacancy,
                  interview.date,
                  interview.time,
                  interview.id
                )
            )
          );
        }),
        bufferCount(interviewsCount),
        tap(interviews => interviews.sort((a, b) => a.time > b.time ? 1 : -1)),
        delay(150)
      );
  }

  addInterview(interview: InterviewClient) {
    const backInterview: Interview = this.transformToBackendModel(interview);
    this._interviewDates = [...this._interviewDates, interview.date];
    return this.http.post(`${BASE_URL}/interviews`, backInterview);
  }

  deleteInterviewById(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/interviews/${id}`);
  }

  updateInterview(interview: InterviewClient) {
    return this.http.put(`${BASE_URL}/interviews/${interview.id}`, this.transformToBackendModel(interview));
  }

  private transformToBackendModel(interview: InterviewClient): Interview {
    return new Interview(
      interview.candidate['id'],
      interview.vacancy['id'],
      interview.date,
      interview.time
    );
  }
}
