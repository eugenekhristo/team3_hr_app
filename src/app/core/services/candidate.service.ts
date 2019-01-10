import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Candidate} from '../models/candidate.model';
import {debounceTime, distinctUntilChanged, switchMap, share} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants/base-url';

@Injectable()
export class CandidateService {
  constructor(private http: HttpClient) {
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${BASE_URL}/candidates`, candidate).pipe(share());
  }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${BASE_URL}/candidates`);
  }

  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${BASE_URL}/candidates/${id}`);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${BASE_URL}/candidates/${candidate.id}`, candidate).pipe(share());
  }

  deleteCandidate(id: number): Observable<null> {
    return this.http.delete<null>(`${BASE_URL}/candidates/${id}`).pipe(share());
  }


  search(searchTerm: Observable<string>): Observable<Candidate[]> {
    return searchTerm.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.http.get<Candidate[]>(`${BASE_URL}/candidates?q=${term}`))
    );
  }

}
