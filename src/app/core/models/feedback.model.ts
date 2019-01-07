import { TimelineItem, TIMELINE_ITEM_TYPE } from './candidate.model';
import { User } from './user.model';
import { Vacancy } from './vacancy.model';

export class FeedbackItem {
  constructor(
    public requirement: string,
    public response: string,
    public require: boolean,
    public public_: boolean
  ) {}
}

export class Feedback implements TimelineItem {
  constructor(
    public notReqPub: FeedbackItem[],
    public notReqPriv: FeedbackItem[],
    public reqPub: FeedbackItem[],
    public reqPriv: FeedbackItem[],
    public timestamp: number,
    public type: TIMELINE_ITEM_TYPE.feedback,
    public interviewer: User,
    public vacancy: Vacancy
  ) {}
}
