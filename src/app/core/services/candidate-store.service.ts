import { Injectable } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { Candidate, TimelineNote } from '../models/candidate.model';
import { CandidateService } from './candidate.service';
import { map, tap, share } from 'rxjs/operators';
import { InterviewService } from 'src/app/pages/system/shared/services/interview.service';
import { InterviewClient, Interview } from '../models/interview.model';
import { Feedback } from '../models/feedback.model';

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
    private interviewService: InterviewService
  ) {}

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

  updateNote(note: TimelineNote): Observable<Candidate>  {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = candidate.timeline.map(item => {
      if (item['type'] === note.type && note.timestamp === item['timestamp']) {
        return note;
      } else {
        return item;
      }
    });
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  addFeedback(feedback: Feedback): Observable<Candidate>  {
    const candidate = this._candidate.getValue();
    console.log(candidate);
    const updatedTimelineClient = [...candidate.timeline, feedback];
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }


  updateFeedback(feedback: Feedback): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = candidate.timeline.map(item => {
      if (item['type'] === feedback.type && feedback.timestamp === item['timestamp']) {
        return feedback;
      } else {
        return item;
      }
    });
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  addInterview(interview: InterviewClient): Observable<Interview> {
    const obs$ = this.interviewService.addInterview(interview);
    obs$.subscribe(res => {
      const candidate = this._candidate.getValue();
      candidate.timeline.push(interview);
      this._candidate.next(candidate);
    });
    return obs$;
  }

  private processTimelineInteraction(candidate: Candidate, updatedTimelineClient?: object[]) {
    const updatedTimelineBack = updatedTimelineClient.filter(item => item['type'] !== 'interview');
    const updateadCandidateBack = { ...candidate, timeline: updatedTimelineBack };
    const updateadCandidateClient = { ...candidate, timeline: updatedTimelineClient };
    const obs$ = this.candidateService.updateCandidate(updateadCandidateBack);
    obs$.subscribe(() => {
      this._candidate.next(updateadCandidateClient);
    });

    return obs$;
  }

  bootstrapCandidate(id: number): Promise<any> {
    return new Promise(resolve => {
      forkJoin(
        this.candidateService.getCandidate(id),
        this.interviewSerivce.getAllInterviews()
      )
      .pipe(
        map(resArr => {
          const candidate: Candidate = resArr[0];
          const allInterviews = resArr[1];
          const filteredInterviews: InterviewClient[] = allInterviews.filter(interview => interview.candidate.id === id);
          const newTimeline = [...candidate.timeline, ...filteredInterviews];
          return { ...candidate, timeline: newTimeline };
        })
      )
      .subscribe(candidate => {
        this._candidate.next(candidate);
        console.log('HEY', candidate);
        resolve();
      });
    });
  }

}
