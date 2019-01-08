import { Component, OnInit } from '@angular/core';
// import { v4 as uuid } from 'uuid';
import { VacancyStore } from 'src/app/core/services/vacancy-store.service';
import { Observable } from 'rxjs';
import { Vacancy } from 'src/app/core/models/vacancy.model';

@Component({
  selector: 'hr-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  vacancies$: Observable<Vacancy[]>;

  constructor(public vacancyStore: VacancyStore) { }

  ngOnInit() {
    this.vacancies$ = this.vacancyStore.vacancies$;
  }

}
