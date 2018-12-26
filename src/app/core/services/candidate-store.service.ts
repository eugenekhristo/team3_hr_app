import { Injectable } from '@angular/core';
import { Subject, Observable, forkJoin } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from './candidate.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { InterviewService } from 'src/app/pages/system/shared/services/interview.service';
import { InterviewClient } from '../models/interview.model';

@Injectable()
export class CandidatesStore {
  private _candidate = new Subject<Candidate>();
  get candidate$() {
    return this._candidate.asObservable();
  }

  constructor(
    private candidateService: CandidateService,
    private interviewSerivce: InterviewService,
    private route: ActivatedRoute
  ) {
    this.bootstrapCandidate();
  }

  bootstrapCandidate(): void {
    const id = +this.route.snapshot.params['id'];

      forkJoin(
        this.candidateService.getCandidate(id),
        this.interviewSerivce.getAllInterviews()
        )
      .pipe(
        map((resArr) => {
          const candidate: Candidate = resArr[0];
          const filteredInterviews: InterviewClient[] = resArr[1].filter(interview => interview.candidate.id === id);
          const newTimeline = [...candidate.timeline, ...filteredInterviews];
          return {...candidate, timeline: newTimeline};
        })
      ).subscribe(candidate => this._candidate.next(candidate));
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    const obs$ = this.candidateService.updateCandidate(candidate);
    obs$.subscribe(res => this._candidate.next(candidate));
    return obs$;
  }
}
