import {Contact} from './contact.model';

export class Candidate {
  constructor(
    public name: string,
    public surname?: string,
    public position?: string,
    public contacts?: Contact[],
    public photo?: string,
    public id?: number
  ) {}
}
