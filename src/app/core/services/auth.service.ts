import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private _isAuth = false;

  get isAuth() {
    return this._isAuth;
  }

  login() {}

  logout() {

  }
}
