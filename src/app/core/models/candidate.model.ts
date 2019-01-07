export enum CONTACT_TYPES {
  phone = 'phone',
  email = 'email',
  skype = 'skype',
  other = 'other'
}
export enum TIMELINE_ITEM_TYPE {
  note = 'note',
  interview = 'interview',
  feedback = 'feedback',
  cv = 'cv',
  experience = 'experience',
}

export interface TimelineItem {
  type?: TIMELINE_ITEM_TYPE;
  timestamp?: number;
}

export class TimelineNote implements TimelineItem {
  constructor(
    public body: string,
    public author?: string,
    public type?: TIMELINE_ITEM_TYPE,
    public timestamp?: number
  ) {
    this.type = TIMELINE_ITEM_TYPE.note;
    this.timestamp = Date.now();
  }
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
    public position?: string,
    public contacts?: Contact[],
    public timeline?: object[],
    public id?: number
  ) {}
}
