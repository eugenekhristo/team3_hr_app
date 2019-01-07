import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { BASE_URL } from '../constants/base-url';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.get<User>(`${BASE_URL}/users`, {params})
    .pipe(
      map(userArr => userArr[0])
    );
  }

  search(searchTerm: Observable<string>): Observable<User[]> {
    return searchTerm.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.http.get<User[]>(`${BASE_URL}/users?q=${term}`))
    );
  }
}
