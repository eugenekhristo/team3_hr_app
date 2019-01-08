enum VACANCY_STATUS {
  opend = 'opened',
  suspended = 'suspended',
  canceled = 'canceled',
  closed = 'closed'
}

export class Requirement {
  constructor(
    public name: string,
    public require: boolean,
    public public_: boolean,
    public id?: number
  ) {}
}

export class CandidateForVacancy {
  constructor(public id: number, public timestamp?: number) {}
}

export class Vacancy {
  constructor(
    public title: string,
    public status?: VACANCY_STATUS,
    public description?: string,
    public requirements?: Requirement[],
    public candidatesID?: CandidateForVacancy[],
    public timestamp?: number,
    public id?: number
  ) {}
}
