export class UrlWatcherService {
  private _prevRoute: string;
  private _curRoute: string;

  get prevRoute() {
    return this._prevRoute;
  }

  constructor() {}

  setWatchedRoute() {
    this._prevRoute = this._curRoute;
    this._curRoute = window.location.pathname;
  }
}
