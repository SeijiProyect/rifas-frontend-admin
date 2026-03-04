import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  getGrupos() {
    return this._http.get(
      environment.url + '/grupo/list',
      {
        headers: this.apiService.authHeader,
      }
    );
  }

  getGruposByViaje(pViaje: any) {
    const params = { viaje: pViaje };

    return this._http.post(
      environment.url + '/admin/get-grupos-by-viaje',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }
}
