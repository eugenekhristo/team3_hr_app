import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from './candidate.service';

@Injectable()
export class CandidatesStore {
  private _candidate = new Subject<Candidate>();
  get candidate$() {
    return this._candidate.asObservable();
  }

  constructor(
    private candidateService: CandidateService,
  ) {}

  bootstrapCandidate(id: number): void {
    this.candidateService.getCandidate(id).subscribe(candidate => this._candidate.next(candidate));
  }

}
