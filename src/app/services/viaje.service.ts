import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  getViajesList() {
    return this._http.get(environment.url + '/admin/get-viajes-list', {
      headers: this.apiService.authHeader,
    });
  }

  getViajesActivosList() {
    return this._http.get(environment.url + '/admin/get-viajes-activos-list', {
      headers: this.apiService.authHeader,
    });
  }

  getViajeById(idViaje: number) {
    /* console.log("TOKEN:");
     console.log(this.apiService.authHeader);
     console.log("TOKEN 2:");
     console.log(this.apiService.authHeaderFreeAccess);*/
    const params = {
      idViaje,
    };

    return this._http.post(
      environment.url + '/api/viaje/get-by-id',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  /*login(loginData: any) {
    return this._http.post(this.api.url + '/auth/login', loginData, {
      headers: this.apiService.commonHeader,
    });
  }*/

  getTokenViaje(idViaje: number) {
    const params = {
      idViaje,
    };
    return this._http.post(
      environment.url + '/api/viaje/get-token-by-id',
      params,
      { headers: this.apiService.authHeaderFreeAccess }
    );
  }

  getViajesListPorPersona(idPersona: number) {
    const params = {
      idPersona,
    };

    return this._http.post(
      environment.url + '/api/viaje/get-list-by-persona',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  inscripcionViaje(form: any) {
    const params = {
      form,
    };

    return this._http.post(
      environment.url + '/api/viaje/inscripcion-viaje',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  guardarTokenViaje(viaje: any) {
    const params = {
      viaje,
    };

    return this._http.post(
      environment.url + '/api/viaje/add-token-viaje',
      params,
      { headers: this.apiService.authHeader }
    );
  }

}
