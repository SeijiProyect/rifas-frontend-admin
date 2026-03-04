import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CostoExtraService {

  constructor(private _http: HttpClient, private apiService: ApiService) { }

  /* getCostoExtra( costo: object ) {
     const params = {
       costo
     };
 
     return this._http.post(environment.url + '/api/costo-extra/edit',
     params,
     {
       headers: this.apiService.authHeader,
     });
   }*/

  delete(id: number) {
    const params = {
      id
    };

    return this._http.post(environment.url + '/api/costo-extra/delete',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  add(idPasajero: number, descripcion: string, monto: number) {
    const params = {
      idPasajero,
      descripcion,
      monto
    };

    return this._http.post(environment.url + '/api/costo-extra/add',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }


}
