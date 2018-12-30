import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Vacancy} from '../../../../../core/models/vacancy.model';
import {VacancyService} from '../../../../../core/services/vacancy.service';

@Component({
  selector: 'hr-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.scss']
})
export class VacancyListComponent implements OnInit {

  vacancies$: Observable<Vacancy[]>;

  constructor(private  vacanciesService: VacancyService) {
  }

  ngOnInit() {
    this.vacancies$ = this.vacanciesService.fetch();
  }

}
