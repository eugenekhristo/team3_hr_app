export enum CONTACT_TYPES {
  phone = 'phone',
  email = 'email',
  skype = 'skype',
  other = 'other'
}
export enum TIMELINE_ITEM_TYPE {
  note = 'note',
  interview = 'interview',
  feedback = 'feedback'
}

export interface TimelineItem {
  type?: TIMELINE_ITEM_TYPE;
  timestamp?: number;
}

export class TimelineNote implements TimelineItem {
  constructor(
    public type: TIMELINE_ITEM_TYPE.note,
    public timestamp: number,
    public body: string
  ) {}
}

export class Contact {
  constructor(
    public type: CONTACT_TYPES,
    public value: string,
    public preferred: boolean
  ) {}
}

export class Candidate {
  constructor(
    public name: string,
    public surname?: string,
    public photo?: string,
    public contacts?: Contact[],
    public timeline?: object[],
    public id?: number
  ) {}
}
