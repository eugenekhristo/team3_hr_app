import { Injectable } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { Candidate, TimelineNote } from '../models/candidate.model';
import { CandidateService } from './candidate.service';
import { map, tap } from 'rxjs/operators';
import { InterviewService } from 'src/app/pages/system/shared/services/interview.service';
import { InterviewClient, Interview } from '../models/interview.model';
import { Feedback } from '../models/feedback.model';
import { CV } from '../models/cv.model';

@Injectable()
export class CandidatesStore {
  private _candidate = new BehaviorSubject<Candidate>(null);
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

  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  private _filteredCandidates$ = new BehaviorSubject<Candidate[]>([]);

  get candidates$() {
    return this._candidates$.asObservable();
  }

  get filteredCandidates$() {
    return this._filteredCandidates$
      .asObservable()
      .pipe(
        tap(candidates => candidates.sort((a, b) => (a.id > b.id ? -1 : 1)))
      );
  }

  get candidates() {
    return this._candidates$.getValue();
  }

  constructor(
    private candidateService: CandidateService,
    private interviewSerivce: InterviewService,
    private interviewService: InterviewService
  ) {
    this.bootstrapCandidates();
  }

  bootstrapCandidates() {
    this.candidateService
      .getAllCandidates()
      .subscribe(candidates => {
        this._candidates$.next(candidates);
        this._filteredCandidates$.next(candidates);
      });
  }

  getLocalCandidatesByIds(ids: number[]): Candidate[] {
    return this.candidates.filter(candidate => ids.includes(candidate.id));
  }

  updateCandidate(candidate: Candidate) {
    const _candidate = this._candidate.getValue();
    const updatedTimelineClient = _candidate.timeline;
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    const obs$ = this.candidateService.addCandidate(candidate);
    const curCandidates =  this._candidates$.getValue();

    obs$.subscribe(returnedCandidate => {
      const updatedCandidates = [...curCandidates, returnedCandidate];
      this._candidates$.next(updatedCandidates);
    });
    return obs$;
  }

  deleteCandidate(id: number): Observable<null> {
    const obs$ = this.candidateService.deleteCandidate(id);
    const curCandidates =  this._candidates$.getValue();

    obs$.subscribe(() => {
      const updatedCandidates = curCandidates.filter(candidate => candidate.id !== id);
      this._candidates$.next(updatedCandidates);
    });
    return obs$;
  }

  deleteNote(note: TimelineNote): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = candidate.timeline.filter(
      item => item['timestamp'] !== note.timestamp
    );
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  addNote(note: TimelineNote): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = [...candidate.timeline, note];
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  deleteCV(cv: CV): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = candidate.timeline.filter(
      item => item['timestamp'] !== cv.timestamp
    );
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  addCv(cv: CV): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = [...candidate.timeline, cv];
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  updateNote(note: TimelineNote): Observable<Candidate> {
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

  addFeedback(feedback: Feedback): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    console.log(candidate);
    const updatedTimelineClient = [...candidate.timeline, feedback];
    return this.processTimelineInteraction(candidate, updatedTimelineClient);
  }

  updateFeedback(feedback: Feedback): Observable<Candidate> {
    const candidate = this._candidate.getValue();
    const updatedTimelineClient = candidate.timeline.map(item => {
      if (
        item['type'] === feedback.type &&
        feedback.timestamp === item['timestamp']
      ) {
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

  private processTimelineInteraction(
    candidate: Candidate,
    updatedTimelineClient?: object[]
  ): Observable<Candidate> {
    const updatedTimelineBack = updatedTimelineClient.filter(
      item => item['type'] !== 'interview'
    );
    const updateadCandidateBack = {
      ...candidate,
      timeline: updatedTimelineBack
    };
    const updateadCandidateClient = {
      ...candidate,
      timeline: updatedTimelineClient
    };
    const obs$ = this.candidateService.updateCandidate(updateadCandidateBack);
    obs$.subscribe(() => {
      this._candidate.next(updateadCandidateClient);
      // NOT TIME TO REFACTOR 🤦‍♂ but next lines to sychronize current local _candidates$ with updated _candidate$
      const currentCandidates = this._candidates$.getValue();
      const updatedCandidates = currentCandidates.map(item => {
        if (item.id === candidate.id) {
          return candidate;
        } else {
          return item;
        }
      });
      this._candidates$.next(updatedCandidates);
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
            const filteredInterviews: InterviewClient[] = allInterviews.filter(
              interview => interview.candidate.id === id
            );
            const newTimeline = [...candidate.timeline, ...filteredInterviews];
            return { ...candidate, timeline: newTimeline };
          })
        )
        .subscribe(candidate => {
          this._candidate.next(candidate);
          resolve();
        });
    });
  }

  filterCandidates(text: BehaviorSubject<string>) {
    text
      .pipe(
        tap(value =>
          this._filteredCandidates$.next(this._filterCandidates(value))
        )
      )
      .subscribe();
  }

  private _filterCandidates(text: string): Candidate[] {
    const value = text.toLowerCase();
    return this._candidates$
      .getValue()
      .filter(
        candidate =>
          this._getFullName(candidate).includes(value) ||
          this._extractContactsAsSingleString(candidate).includes(text)
      );
  }

  private _getFullName(candidate: Candidate): string {
    return `${candidate.name.toLocaleLowerCase()} ${candidate.surname.toLocaleLowerCase()}`;
  }

  private _extractContactsAsSingleString(candidate: Candidate): string {
    return candidate.contacts.map(contact => contact.value).join('');
  }
}
