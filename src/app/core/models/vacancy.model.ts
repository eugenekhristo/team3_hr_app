export class Requirement {
  constructor(
    public name: string,
    public require: boolean,
    public public_: boolean
  ) {}
}

export class Vacancy {
  constructor(
    public title: string,
    public id: number,
    public status?: string
  ) {}
}
