import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SorteoService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  crearSorteo(sorteo: any) {
    const params = {
      sorteo
    };
    return this._http.post(environment.url + '/api/sorteo/crear', params, {
      headers: this.apiService.authHeader,
    });
  }

  editarSorteo(sorteo: any) {
    const params = {
      sorteo
    };
    return this._http.post(environment.url + '/api/sorteo/editar', params, {
      headers: this.apiService.authHeader,
    });
  }

  delete(id: number) {
    const params = {
      id
    };

    return this._http.post(environment.url + '/api/sorteo/delete',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }


  getSorteoById(id: number) {
    const params = {
      id
    };
    return this._http.post(
      environment.url + '/sorteo/get-datos-by-id',
      params
    );
  }

  getSorteosByRifaId(pRifa_id: number) {
    const params = { rifa: pRifa_id };
    return this._http.post(environment.url + '/api/soteo/get-sorteo-by-rifa',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getSorteos() {
    return this._http.post(environment.url + '/', {
      headers: this.apiService.authHeader,
    });
  }

}
