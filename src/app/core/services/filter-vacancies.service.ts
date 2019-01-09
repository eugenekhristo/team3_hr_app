import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VACANCY_STATUS } from '../models/vacancy.model';
import { VacancyStore } from './vacancy-store.service';

@Injectable()
export class FilterVacanciesService {
  isToolbarShown = true;
  vacancyStatuses = Object.values(VACANCY_STATUS);
  filterText$ = new BehaviorSubject<string>('');
  filterStatuses$: BehaviorSubject<VACANCY_STATUS[]>;

  get curFilterText() {
    return this.filterText$.getValue();
  }

  constructor(private vacancyStore: VacancyStore) {
    this.filterStatuses$ = new BehaviorSubject<VACANCY_STATUS[]>(this.vacancyStatuses);
    this.vacancyStore.filterVacancies(this.filterText$, this.filterStatuses$);
  }

  toggleStatusFilteres(statusName: string, isIncluded: boolean): void {
    const curFilter = this.filterStatuses$.getValue();
    let newFilter: VACANCY_STATUS[];

    if (isIncluded) {
      newFilter = [...curFilter, statusName] as VACANCY_STATUS[];
    } else {
      newFilter = curFilter.filter(status => status !== statusName);
    }

    this.filterStatuses$.next(newFilter);
  }

  isStatusIncluded(status: VACANCY_STATUS): boolean {
    return this.filterStatuses$.getValue().includes(status);
  }

  callAllbehaviorSubjects() {
    this.filterText$.next(this.filterText$.getValue());
    this.filterStatuses$.next(this.filterStatuses$.getValue());
  }
}
