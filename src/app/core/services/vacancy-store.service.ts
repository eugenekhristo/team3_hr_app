import { Injectable } from '@angular/core';
import { VacancyService } from './vacancy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacancy, CandidateForVacancy } from '../models/vacancy.model';
import { tap } from 'rxjs/operators';
import { CandidatesStore } from './candidate-store.service';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class VacancyStore {
  private _vacancies$ = new BehaviorSubject<Vacancy[]>([]);
  private _filteredVacancies$ = new BehaviorSubject<Vacancy[]>([]);
  private _vacancy$ = new BehaviorSubject<Vacancy>(null);
  private _possibleCandidates$ = new BehaviorSubject<Candidate[]>([]);

  get vacancy$() {
    return this._vacancy$.asObservable();
  }

  get filteredVacancies$() {
    return this._filteredVacancies$
    .asObservable()
    .pipe(
      tap(vacancies =>
        vacancies.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
      )
    );
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
    this.vacancyService.getAllVacancies().subscribe(vacancies => {
      this._vacancies$.next(vacancies);
      this._filteredVacancies$.next(vacancies);
    });
  }

  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    const obs$ = this.vacancyService.updateVacancy(vacancy);
    obs$.subscribe(() => {
      this._vacancy$.next(vacancy);
      this.processPossibleCandidatesUpdating(vacancy);

      const currentVacancies = this._vacancies$.getValue();
      const updatedVacancies = currentVacancies.map(item => {
        if (item.id === vacancy.id) {
          return vacancy;
        } else {
          return item;
        }
      });
      this._vacancies$.next(updatedVacancies);
    });
    return obs$;
  }

  addVacancy(vacancy: Vacancy): Observable<Vacancy> {
    const obs$ = this.vacancyService.addVacancy(vacancy);
    obs$.subscribe(returnedVacancy => {
      const currentVacancies = this._vacancies$.getValue();
      const updatedVacancies = [...currentVacancies, returnedVacancy];
      this._vacancies$.next(updatedVacancies);
    });
    return obs$;
  }

  deleteVacancy(id: number): Observable<Object> {
    const obs$ = this.vacancyService.deleteVacancy(id);
    obs$.subscribe(() => {
      const currentVacancies = this._vacancies$.getValue();
      const updatedVacancies = currentVacancies.filter(vacancy => vacancy.id !== id);
      this._vacancies$.next(updatedVacancies);
    });
    return obs$;
  }

  addPossibleCandidate(candidate: CandidateForVacancy): Observable<Vacancy> {
    const vacancy = this._vacancy$.getValue();
    vacancy.candidatesBlobs = [...vacancy.candidatesBlobs, candidate];
    return this.updateVacancy(vacancy);
  }

  filterVacancies(text: Observable<string>) {
    text
      .pipe(
        tap(value =>  this._filteredVacancies$.next(this._filterVacancies(value))
        )
      )
      .subscribe();
  }

  private _filterVacancies(text: string): Vacancy[] {
    const value = text.toLowerCase();
    return this._vacancies$.getValue().filter(vacancy => vacancy.title.toLowerCase().includes(value));
  }

  private processPossibleCandidatesUpdating(vacancy: Vacancy) {
    const candidatesIds = this.getCandidatesIds(vacancy.candidatesBlobs);
    const possibleCandidates = this.candidateStore.getLocalCandidatesByIds(
      candidatesIds
    );
    this._possibleCandidates$.next(possibleCandidates);
  }

  private getCandidatesIds(dirtyArr: CandidateForVacancy[]): number[] {
    const result = [];

    for (const item of dirtyArr) {
      result.push(item.id);
    }

    return result;
  }
}
