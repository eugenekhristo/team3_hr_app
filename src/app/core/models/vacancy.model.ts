import { v4 as uuid } from 'uuid';
import { Contact } from './candidate.model';

export enum VACANCY_STATUS {
  opend = 'opened',
  suspended = 'suspended',
  canceled = 'canceled',
  closed = 'closed'
}

export class Requirement {
  constructor(
    public name: string,
    public require: boolean,
    public _public: boolean,
    public id: string = uuid()
  ) {}
}

export class CandidateForVacancy {
  constructor(
    public id: number,
    public timestamp: number = Date.now()
  ) {}
}

export interface CandidateForVacancyFull {
  name: string;
  surname?: string;
  photo?: string;
  contacts: Contact[];
  timeline: object[];
  timestamp: number;
  id?: number;
}

export class Vacancy {
  constructor(
    public title: string,
    public status?: VACANCY_STATUS,
    public description?: string,
    public requirements?: Requirement[],
    public candidatesBlobs: CandidateForVacancy[] = [],
    public timestamp: number = Date.now(),
    public id?: number
  ) {}
}
