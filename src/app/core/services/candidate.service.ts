import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Candidate, CandidateClient} from '../models/candidate.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants/base-url';

@Injectable()
export class CandidateService {

  newCandidateAdded$ = new Subject<CandidateClient>();

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${BASE_URL}/candidates`);
  }

  getById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${BASE_URL}/candidates/${id}`);
  }

  update(id: number, candidate: Candidate): Observable<Candidate> {
    return this.http.patch<Candidate>(`${BASE_URL}/candidates/${id}`, candidate);
  }

  search(searchTerm: Observable<string>): Observable<Candidate[]> {
    return searchTerm.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.http.get<Candidate[]>(`${BASE_URL}/candidates?q=${term}`))
    );
  }

  addCandidate(candidate: CandidateClient) {
    const backCandidate: Candidate = this.transformToBackendModel(candidate);
    return this.http.post(`${BASE_URL}/candidates`, backCandidate);
  }

  private transformToBackendModel(candidate: CandidateClient): Candidate {
    return new Candidate(
      candidate.name,
      candidate.surname,
      candidate.position
    );
  }
}
