import { TimelineItem, TIMELINE_ITEM_TYPE } from './candidate.model';

export class CV implements TimelineItem {
  constructor(
    public name?: string,
    public data?: string,
    public mime?: string,
    public size?: number,
    public timestamp?: number,
    public type?: TIMELINE_ITEM_TYPE.cv
  ) {}
}
