import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/app/core/constants/base-url';

import { Observable, from, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, mergeMap, bufferCount, delay, debounceTime } from 'rxjs/operators';

import { Interview, InterviewClient } from 'src/app/core/models/interview.model';



@Injectable()
export class InterviewService {
  private _interviewDates: string[];

  constructor(private http: HttpClient) {}

  getInterviewsDates(): Observable<string[]> {
   return this.http.get<Interview[]>(`${BASE_URL}/interviews`).pipe(
      map(interviews => {
        return interviews.map(interview => (interview.date));
      }),
      tap(dates => this._interviewDates = dates)
    );
  }

  getInterviewsByDate(date: string): Observable<InterviewClient[]> {
    if (this._interviewDates && !this._interviewDates.includes(date)) {
      return of(null);
    }

    let count = 0;
    const params = new HttpParams().set('date', date);
    return this.http.get<Interview[]>(`${BASE_URL}/interviews`, { params })
      .pipe(
        tap(interviews => count = interviews.length),
        switchMap(interviews => from(interviews)),
        mergeMap(interview => {
          return forkJoin(
            this.http.get(`${BASE_URL}/candidates/${interview.candidateId}`),
            this.http.get(`${BASE_URL}/vacancies/${interview.vacancyId}`)
          ).pipe(
            map(([candidate, vacancy]) => new InterviewClient(candidate, vacancy, interview.date, interview.id))
          );
        }),
        bufferCount(count),
        delay(300)
      );
  }


}
