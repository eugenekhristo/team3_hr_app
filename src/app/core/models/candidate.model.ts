import {Contact} from './contact.model';
import {Notes} from './notes.model';
import {Experience} from './experience.model';
import {CV} from './cv.model';


export class Candidate {
  constructor(
    public name: string,
    public surname?: string,
    public position?: string,
    public contacts?: Contact[],
    public notes?: Notes[],
    public cv?: CV[],
    public experience?: Experience[],
    public photo?: string,
    public id?: number
  ) {}
}
