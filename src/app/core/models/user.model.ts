export class User {
  constructor(
    public email: string,
    public name: string,
    public surname: string,
    public password: string,
    public id?: string | number
  ) {}
}
