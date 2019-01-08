import { Injectable } from '@angular/core';
import { VacancyService } from './vacancy.service';
import { BehaviorSubject } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { _MatChipListMixinBase } from '@angular/material';
import { tap } from 'rxjs/operators';

@Injectable()
export class VacancyStore {
  private _vacancies$ = new BehaviorSubject<Vacancy[]>([]);

  get vacancies$() {
    return this._vacancies$.asObservable().pipe(
      tap(vacancies => vacancies.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1))
    );
  }

  constructor(private vacancyService: VacancyService) {
    this.bootstrapVacancies();
  }

  private bootstrapVacancies() {
    this.vacancyService.getAllVacancies().subscribe(vacancies => this._vacancies$.next(vacancies));
  }
}
