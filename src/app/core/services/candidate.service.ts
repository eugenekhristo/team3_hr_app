import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Candidate} from '../models/candidate.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants/base-url';

@Injectable()
export class CandidateService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${BASE_URL}/candidates`);
  }

  getById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${BASE_URL}/candidates/${id}`);
  }

  update(candidate: Candidate): Observable<Candidate> {
    return this.http.patch<Candidate>(`${BASE_URL}/candidates/${candidate.id}`, candidate);
  }

  search(searchTerm: Observable<string>): Observable<Candidate[]> {
    return searchTerm.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.http.get<Candidate[]>(`${BASE_URL}/candidates?q=${term}`))
    );
  }

}
