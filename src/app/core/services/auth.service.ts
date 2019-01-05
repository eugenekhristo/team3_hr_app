import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _isAuth = false;

  constructor(private router: Router) {}

  get isAuth() {
    return this._isAuth;
  }

  login(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user));
    this._isAuth = true;
    this.router.navigate(['/interview']);
  }

  logout(): void {
    window.localStorage.removeItem('user');
    this._isAuth = false;
    this.router.navigate(['/login']);
  }

  getAuthUser(): User {
    if (this._isAuth) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
}
