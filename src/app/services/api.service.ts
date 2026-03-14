import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../common/global.service';

const jwt_secret = 'dtytrifas2022tokenPasss';
const base_url = environment.url;
const tokenLimitOneYear = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiaW5mb0BkZXRvcXVleXRvcXVlLmNvbSIsImV4cCI6MTczNDcyNzk4M30.K7kjuT4GpMkUh7seoFxxIZndbXGeASSFd3Y0xgZg3f8';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  get token(): string {
    return localStorage.getItem(this.globalService.getTokenName()) || '';
  }

  get tokenPublico(): string {
    return localStorage.getItem(this.globalService.getTokenPublico()) || '';
  }

  get url(): string {
    return base_url;
  }

  get authHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: this.token,
    });
  }

  get authHeaderFreeAccess(): HttpHeaders {
    //const tokenLimitOneYear = localStorage.getItem(this.globalService.getTokePublico()) || '';
    localStorage.setItem(this.globalService.getTokenPublico(), tokenLimitOneYear);
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: tokenLimitOneYear,
    });
  }

  get commonHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  tokenValidation(): Observable<boolean> {
    return this.http
      .get(this.url + '/admin/api/validate', {
        headers: this.authHeader,
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
