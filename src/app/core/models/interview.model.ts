import { Candidate } from './candidate.model';
import { Vacancy } from './vacancy.model';

export class Interview {
  constructor(
    public candidateId: number,
    public vacancyId: number,
    public start: string,
    public end: string,
    public place?: string,
    public title?: string,
    public id?: number
  ) {}
}

export class InterviewClient {
  constructor(
    public candidate: Candidate,
    public vacancy: Vacancy,
    public start: string,
    public end: string,
    public place?: string,
    public title?: string,
    public id?: number
  ) {}
}
