import { Candidate, TIMELINE_ITEM_TYPE, TimelineItem } from './candidate.model';
import { Vacancy } from './vacancy.model';

export class Interview {
  constructor(
    public candidateId: number,
    public vacancyId: number,
    public start: string,
    public end: string,
    public place?: string,
    public title?: string,
    public timestamp?: number,
    public type?: TIMELINE_ITEM_TYPE,
    public id?: number
  ) {}
}

export class InterviewClient implements TimelineItem {
  constructor(
    public candidate: Candidate,
    public vacancy: Vacancy,
    public start: string,
    public end: string,
    public place?: string,
    public title?: string,
    public timestamp?: number,
    public type?: TIMELINE_ITEM_TYPE,
    public id?: number
  ) {
    if (!this.id) {
      this.timestamp = Date.now();
      this.type = TIMELINE_ITEM_TYPE.interview;
    }
  }
}
