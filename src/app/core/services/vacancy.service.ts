import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, share} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants/base-url';
import {Vacancy} from '../models/vacancy.model';

@Injectable()
export class VacancyService {
  constructor(private http: HttpClient) {
  }

  getAllVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${BASE_URL}/vacancies`);
  }

  getVacancy(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${BASE_URL}/vacancies/${id}`).pipe(share());
  }

  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>(`${BASE_URL}/vacancies/${vacancy.id}`, vacancy).pipe(share());
  }

  search(searchTerm: Observable<string>): Observable<Vacancy[]> {
    return searchTerm.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.http.get<Vacancy[]>(`${BASE_URL}/vacancies?q=${term}`))
    );
  }
}
