import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UniversidadService {
  constructor(private _http: HttpClient, private apiService: ApiService) {}

  getUniversidadesList() {
    return this._http.get(environment.url + '/admin/get-universidades-list', {
      headers: this.apiService.authHeader,
    });
  }
}
