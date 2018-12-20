import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { InterviewClient, Interview } from 'src/app/core/models/interview.model';
import { InterviewService } from './interview.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class InterviewStore {
  private _interview = new Subject<InterviewClient>();
  get interview$() {
    return this._interview.asObservable();
  }

  constructor(
    private interviewService: InterviewService,
    private route: ActivatedRoute
  ) {
    this.interviewService
      .getInterview(this.route.snapshot.params['id'])
      .subscribe(interview => {
        this._interview.next(interview);
      });
  }

  updateInterview(interview: InterviewClient): Observable<Interview> {
    const obs = this.interviewService.updateInterview(interview);
    obs.subscribe(res => this._interview.next(interview));
    return obs;
  }
}
