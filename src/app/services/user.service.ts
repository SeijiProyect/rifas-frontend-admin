import { Injectable } from '@angular/core';
import { HttpClient }	from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalService } from '../common/global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _http: HttpClient,
    private api: ApiService,
    private router: Router,
    private globalService: GlobalService
  ) {}

  forgetPassword(email: string | undefined) {
    let params = {
      email: email,
    };

    return this._http.post(environment.url + '/reset-link', params, {
      headers: this.api.commonHeader,
    });
  }

  loginFree() {
    return this._http.post(this.api.url + '/auth/loginFree', {
      headers: this.api.commonHeader,
    });
  }

  tokenFree() {
    return this._http.post(this.api.url + '/auth/tokenFree', {
      headers: this.api.commonHeader,
    });
  }

  login(loginData: any) {
    return this._http.post(this.api.url + '/auth/login', loginData, {
      headers: this.api.commonHeader,
    });
  }

  firstLogin(email: string, pass: string) {
    const params = {
      email: email,
      password: pass,
      getHash: false,
    };
    return this._http.post(environment.url + '/auth/first-login', params, {
      headers: this.api.commonHeader,
    });
  }

  resetPassword(pToken: any, pPassword: string) {
    let params = {
      token: pToken,
      password: pPassword,
    };

    return this._http.post(environment.url + '/reset-password', params, {
      headers: this.api.commonHeader,
    });
  }

  verifyLink(token: any) {
    let params = {
      token: token,
    };

    return this._http.post(environment.url + '/verify-reset-link', params, {
      headers: this.api.commonHeader,
    });
  }

  logout(): void {
    localStorage.removeItem('identity');
    localStorage.removeItem(this.globalService.getTokenName());

    window.location.href = '/login';
  }

  tokenValidation(): Observable<unknown> {
    return this._http
      .get(this.api.url + '/api/validate', {
        headers: {
          Authorization: this.api.token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem(this.globalService.getTokenName(), resp.token);
          return of(true);
        }),
        map((resp) => true),
        catchError((error) => {
          return of(false);
        })
      );
  }
}

