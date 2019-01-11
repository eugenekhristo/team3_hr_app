import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { VacancyStore } from 'src/app/core/services/vacancy-store.service';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { tap, takeUntil } from 'rxjs/operators';

@Injectable()
export class PossibleCandidatesFilterService implements OnDestroy {
  private _destroyed$ = new Subject();
  filterText$ = new BehaviorSubject<string>('');
  private _filteredCandidatesForVacancy$ = new BehaviorSubject<Candidate[]>([]);

  get filteredCandidatesForVacancy$() {
    return this._filteredCandidatesForVacancy$
      .asObservable();
  }

  get filteredCandidatesForVacancy() {
    return this._filteredCandidatesForVacancy$.getValue();
  }

  constructor(private vacancyStore: VacancyStore, private candidateStore: CandidatesStore) {
    // this.filterText$.next('sd8fs8df8s8df89s89df89s89df89s8df89sdYou~will~~never-find-ME!!!');
    this.filterCandidatesForVacancy(this.filterText$);
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  filterCandidatesForVacancy(text: BehaviorSubject<string>) {
    text
      .pipe(
        tap(value =>
          this._filteredCandidatesForVacancy$.next(this._filteredCandidatesForVacancy(value))
        ),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  private _filteredCandidatesForVacancy(text: string): Candidate[] {
    const value = text.toLowerCase();
    return this.candidateStore.candidates
      .filter(
        candidate =>
          !this.vacancyStore.getPossibleCandidatesIds().includes(candidate.id) &&
          (this._getFullName(candidate).includes(value) ||
          this._extractContactsAsSingleString(candidate).includes(text))
      );
  }


  private _getFullName(candidate: Candidate): string {
    return `${candidate.name.toLocaleLowerCase()} ${candidate.surname.toLocaleLowerCase()}`;
  }

  private _extractContactsAsSingleString(candidate: Candidate): string {
    return candidate.contacts.map(contact => contact.value).join('');
  }
}
