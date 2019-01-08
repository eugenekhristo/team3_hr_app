import { Injectable } from '@angular/core';
import { VacancyService } from './vacancy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacancy, CandidateForVacancy } from '../models/vacancy.model';
import { _MatChipListMixinBase } from '@angular/material';
import { tap } from 'rxjs/operators';
import { CandidatesStore } from './candidate-store.service';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class VacancyStore {
  private _vacancies$ = new BehaviorSubject<Vacancy[]>([]);
  private _vacancy$ = new BehaviorSubject<Vacancy>(null);
  private _possibleCandidates$ = new BehaviorSubject<Candidate[]>([]);

  get vacancies$() {
    return this._vacancies$
      .asObservable()
      .pipe(
        tap(vacancies =>
          vacancies.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        )
      );
  }

  get vacancy$() {
    return this._vacancy$.asObservable();
  }

  get possibleCandidates$() {
    return this._possibleCandidates$.asObservable();
  }

  constructor(
    private vacancyService: VacancyService,
    private candidateStore: CandidatesStore
  ) {
    this.bootstrapVacancies();
    this.candidateStore.bootstrapCandidates();
  }

  bootstrapVacancy(id: number): Observable<Vacancy> {
    const obs$ = this.vacancyService.getVacancy(id);
    obs$.subscribe(vacancy => {
      this._vacancy$.next(vacancy);
      this.processPossibleCandidatesUpdating(vacancy);
    });
    return obs$;
  }

  private bootstrapVacancies() {
    this.vacancyService
      .getAllVacancies()
      .subscribe(vacancies => this._vacancies$.next(vacancies));
  }

  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    const obs$ = this.vacancyService.updateVacancy(vacancy);
    obs$.subscribe(() => {
      this._vacancy$.next(vacancy);
      this.processPossibleCandidatesUpdating(vacancy);
    });
    return obs$;
  }

  addPossibleCandidate(candidate: CandidateForVacancy): Observable<Vacancy> {
    const vacancy = this._vacancy$.getValue();
    vacancy.candidatesBlobs = [...vacancy.candidatesBlobs, candidate];
    return this.updateVacancy(vacancy);
  }

  private processPossibleCandidatesUpdating(vacancy: Vacancy) {
    const candidatesIds = this.getCandidatesIds(vacancy.candidatesBlobs);
    const possibleCandidates = this.candidateStore.getLocalCandidatesByIds(candidatesIds);
    this._possibleCandidates$.next(possibleCandidates);
  }

  // FIXME: maybe make a local helper service for functions that are not related to managing store directly
  private getCandidatesIds(dirtyArr: CandidateForVacancy[]): number[] {
    const result = [];

    for (const item of dirtyArr) {
      result.push(item.id);
    }

    return result;
  }
}
