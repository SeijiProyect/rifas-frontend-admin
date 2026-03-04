import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PagoPersonalService {
  constructor(private _http: HttpClient, private apiService: ApiService) {}

  savePagoPersonal(monto:number, depositoId:any) {
    const params = {
      depositoId,
      monto,
    };

    let head = new HttpHeaders({
      Authorization: this.apiService.token,
    });

    return this._http.post(
      environment.url + '/admin/ingresar-pago-personal',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }

}
