import { Injectable } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { Candidate, TimelineNote } from '../models/candidate.model';
import { CandidateService } from './candidate.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { InterviewService } from 'src/app/pages/system/shared/services/interview.service';
import { InterviewClient } from '../models/interview.model';

@Injectable()
export class CandidatesStore {
  private _candidate: BehaviorSubject<Candidate> = new BehaviorSubject<Candidate>(null);
  get candidate$() {
    return this._candidate.asObservable().pipe(
      tap(candidate => {
        if (candidate) {
          candidate.timeline.sort((a, b) => {
            return a['timestamp'] > b['timestamp'] ? -1 : 1;
          });
        }
      })
    );
  }

  constructor(
    private candidateService: CandidateService,
    private interviewSerivce: InterviewService,
    private route: ActivatedRoute
  ) {
    this.bootstrapCandidate();
  }

  updateCandidate(candidate: Candidate) {
    const _candidate = this._candidate.getValue();
    const updatedTimelineClient = _candidate.timeline;
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  deleteNote(note: TimelineNote): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = candidate.timeline.filter(item => item['timestamp'] !== note.timestamp);
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  addNote(note: TimelineNote): Observable<Candidate>  {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = [...candidate.timeline, note];
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  private processTimelineInteraction(candidate: Candidate, updatedTimelineClient?: object[]) {
    const updatedTimelineBack = updatedTimelineClient.filter(item => item['type'] !== 'interview');
    const updateadCandidateBack = { ...candidate, timeline: updatedTimelineBack };
    const updateadCandidateClient = { ...candidate, timeline: updatedTimelineClient };
    const obs$ = this.candidateService.updateCandidate(updateadCandidateBack);
    obs$.subscribe(() => this._candidate.next(updateadCandidateClient));
    return obs$;
  }

  private bootstrapCandidate(): void {
    const id = +this.route.snapshot.params['id'];

    forkJoin(
      this.candidateService.getCandidate(id),
      this.interviewSerivce.getAllInterviews()
    )
      .pipe(
        map(resArr => {
          const candidate: Candidate = resArr[0];
          const filteredInterviews: InterviewClient[] = resArr[1].filter(
            interview => interview.candidate.id === id
          );
          const newTimeline = [...candidate.timeline, ...filteredInterviews];
          return { ...candidate, timeline: newTimeline };
        })
      )
      .subscribe(candidate => {
        this._candidate.next(candidate);
      });
  }

}
