import {Injectable} from '@angular/core';

@Injectable()
export class VacancyService {
  vacancy: any = {
    id: 1,
    name: 'Mifort developer ',
    description: ' We are looking for a responsible, active employee with leadership qualities and meeting the following requirements:\n' +
      'work experience: 3 years or more\n' +
      'knowledge of English: B1 and above ',
    position: 'Front-end developer',
    status: 'opened',
  };

  skills: any = {
    ts: false,
    js: false,
    java: false,
    cpp: false,
    cSharp: false,
    python: false,
    php: false,
  };

  candidateList: any[] = [
    {
      id: 1,
      name: 'Sam',
      surname: 'Scarlett ',
      position: 'Front-end developer',
      salary: {
        count: 500,
        type: '$',
      }
    },
    {
      id: 2,
      name: 'Mac',
      surname: 'Sam ',
      position: 'Front-end developer',
      salary: {
        count: 550,
        type: '$',
      }
    },
    {
      id: 2,
      name: 'Lili',
      surname: 'Mac ',
      position: 'Front-end developer',
      salary: {
        count: 550,
        type: '$'
      }
    }];
  newCandidateList: any[] = [
    {
      id: 1,
      name: 'Sam',
      surname: 'Sarlet ',
      position: 'Front-end',
      salary: {
        count: 500,
        type: '$',
      }
    },
    {
      id: 2,
      name: 'Mac',
      surname: 'Samill ',
      position: 'Front-end',
      salary: {
        count: 550,
        type: '$',
      }
    },
    {
      id: 2,
      name: 'Lili',
      surname: 'Maclem ',
      position: 'Front-end',
      salary: {
        count: 550,
        type: '$'
      }
    }];

  constructor() {
  }
}
