import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../../../core/models/candidate.model';
import {BASE_URL} from '../../../core/constants/base-url';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

// import * as db from '../../../../../db.json';

@Injectable()
export class VacancyService {
  vacancy: any = {
    id: 1,
    name: 'Mifort developer ',
    description: ' We are looking for a responsible, active employee with leadership qualities and meeting the following requirements:\n' +
      'work experience: 3 years or more\n' +
      'knowledge of English: B1 and above ',
    position: 'Front-end developer',
    status: 'opened'
  };

  skills: any = {
    ts: false,
    js: false,
    java: false,
    cpp: false,
    cSharp: false,
    python: false,
    php: false
  };

  newCandidateList: any[] = [
    {
      id: 1,
      name: 'Sam',
      surname: 'Sarlet ',
      position: 'Front-end',
      salary: {
        count: 500,
        type: '$'
      }
    },
    {
      id: 2,
      name: 'Mac',
      surname: 'Samill ',
      position: 'Front-end',
      salary: {
        count: 550,
        type: '$'
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

  constructor(private http: HttpClient) {
  }

  getCandidateList() {
    return this.http.get<Candidate[]>(`${BASE_URL}/candidates`).pipe(
      tap(candidates => console.log('candidates: ', candidates))
    );
  }

  deleteCandidate(candidate: Candidate): Observable<any> {
    return this.http.delete(`${BASE_URL}/candidates/${candidate.id}`);
  }

  // FIXME doesn't work
  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${BASE_URL}/candidates`, candidate);
  }

  get

}
