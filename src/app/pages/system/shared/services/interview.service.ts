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
import { Candidate } from 'src/app/core/models/candidate.model';
import { Vacancy } from 'src/app/core/models/vacancy.model';

@Injectable()
export class InterviewService {
  constructor(private http: HttpClient) {}

  getAllInterviews(): Observable<InterviewClient[]> {
    let interviewsCount = 0;

    return this.http.get<Interview[]>(`${BASE_URL}/interviews`).pipe(
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
                candidate as Candidate,
                vacancy as Vacancy,
                interview.start,
                interview.end,
                interview.place,
                interview.title,
                interview.id
              )
          )
        );
      }),
      bufferCount(interviewsCount)
    );
  }

  addInterview(interview: InterviewClient): Observable<Interview> {
    const backInterview: Interview = this.transformToBackendModel(interview);
    return this.http.post<Interview>(`${BASE_URL}/interviews`, backInterview);
  }

  // deleteInterviewById(id: number): Observable<any> {
  //   return this.http.delete(`${BASE_URL}/interviews/${id}`);
  // }

  // updateInterview(interview: InterviewClient) {
  //   return this.http.put(
  //     `${BASE_URL}/interviews/${interview.id}`,
  //     this.transformToBackendModel(interview)
  //   );
  // }

  private transformToBackendModel(interview: InterviewClient): Interview {
    return new Interview(
      interview.candidate['id'],
      interview.vacancy['id'],
      interview.start,
      interview.end,
      interview.place,
      interview.title
    );
  }
}
