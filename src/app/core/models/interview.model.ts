import { Candidate } from './candidate.model';
import { Vacancy } from './vacancy.model';

export class Interview {
  constructor(
    public candidateId: number,
    public vacancyId?: number,
    public date?: string,
    public time?: string,
    public curdate?: Date,
    public id?: number,
  ) {}
}

export class InterviewClient {
  constructor(
    public candidate: Candidate | Object,
    public vacancy: Vacancy | Object,
    public date: string,
    public time?: string,
    public curdate?: Date,
    public id?: number,
  ) {}
}
