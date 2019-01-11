import { Injectable } from '@angular/core';
import { VacancyService } from './vacancy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacancy, CandidateForVacancy, CandidateForVacancyFull } from '../models/vacancy.model';
import { tap } from 'rxjs/operators';
import { CandidatesStore } from './candidate-store.service';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class VacancyStore {
  private _vacancies$ = new BehaviorSubject<Vacancy[]>([]);
  private _filteredVacancies$ = new BehaviorSubject<Vacancy[]>([]);
  private _vacancy$ = new BehaviorSubject<Vacancy>(null);
  private _possibleCandidates$ = new BehaviorSubject<CandidateForVacancyFull[]>([]);

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
    return this._possibleCandidates$.asObservable().pipe(
      tap(items => items.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1))
    );
  }


  constructor(
    private vacancyService: VacancyService,
    private candidateStore: CandidatesStore
  ) {
    this.bootstrapVacancies();

    if (!this.candidateStore.candidates) {
      this.candidateStore.bootstrapCandidates();
    }
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

  addPossibleCandidates(candidates: CandidateForVacancy[]): Observable<Vacancy> {
    const vacancy = this._vacancy$.getValue();
    vacancy.candidatesBlobs = [...vacancy.candidatesBlobs, ...candidates];
    return this.updateVacancy(vacancy);
  }

  deletePossibleCandidate(id: number): Observable<Vacancy> {
    const vacancy = this._vacancy$.getValue();
    vacancy.candidatesBlobs = vacancy.candidatesBlobs.filter(item => item.id !== id);
    return this.updateVacancy(vacancy);
  }

  filterVacancies(text: BehaviorSubject<string>, statusesFilter: BehaviorSubject<string[]>) {
    text
      .pipe(
        tap(value =>  this._filteredVacancies$.next(this._filterVacancies(value, statusesFilter.getValue()))
        )
      )
      .subscribe();

    statusesFilter
      .pipe(
        tap(statuses =>  this._filteredVacancies$.next(this._filterVacancies(text.getValue(), statuses))
        )
      )
      .subscribe();
  }

  private _filterVacancies(text: string, statusesFilter: string[]): Vacancy[] {
    const value = text.toLowerCase();
    return this._vacancies$.getValue().filter(vacancy => {
      return vacancy.title.toLowerCase().includes(value) &&
      statusesFilter.includes(vacancy.status);
    });
  }

  private processPossibleCandidatesUpdating(vacancy: Vacancy) {
    const candidatesIds = this.getPossibleCandidatesIds();
    const possibleCandidates = this.candidateStore.getLocalCandidatesByIds(
      candidatesIds
    );
    const possibleCandidatesFull: CandidateForVacancyFull[] =
    this.transformCandidatesToVacancyCandidates(possibleCandidates);
    this._possibleCandidates$.next(possibleCandidatesFull);
  }
/**
 * Because in app it's easier to work with possible candidates as with id[]
 */
  getPossibleCandidatesIds(): number[] {
    const possibleCandidatesBlobs = this._vacancy$.getValue().candidatesBlobs;
    const result = [];

    for (const item of possibleCandidatesBlobs) {
      result.push(item.id);
    }

    return result;
  }

  // make new interface CandidateForVacancy
  private transformCandidatesToVacancyCandidates(candidates: Candidate[]): CandidateForVacancyFull[] {
    const candidateBlobs = this._vacancy$.getValue().candidatesBlobs;
    const result: CandidateForVacancyFull[] = [];

    candidates.forEach(item => {
      for (const blob of candidateBlobs) {
        if (item.id === blob.id) {
          item['timestamp'] = blob.timestamp;
           result.push(item as CandidateForVacancyFull);
           return;
        }
      }
    });

    return result;
  }
}
