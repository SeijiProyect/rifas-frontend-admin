import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepositosService {
  constructor(private _http: HttpClient, private apiService: ApiService) {}

  getDepositos(
    pageIndex = 0,
    tipo: string,
    desde: number | string,
    hasta: number | string,
    pasajero: number | string,
    termino: string
  ) {
    const params = {
      pageIndex,
      tipo,
      desde,
      hasta,
      pasajero,
      termino,
    };

    return this._http.post(
      environment.url + '/admin/get-depositos-list',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }

  uploadCsv( formData:any ) {
    let head = new HttpHeaders({
      Authorization: this.apiService.token,
    });

    return this._http.post(environment.url + '/admin/upload-csv', formData, {
      headers: head,
    });
  }

  saveDepositosCsv( depositos:any ) {
    const params = {
      depositos
    };

    let head = new HttpHeaders({
      Authorization: this.apiService.token,
    });

    return this._http.post(
      environment.url + '/admin/procesar-depositos-csv',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }

  saveDepositoTarjeta( deposito:any, tarjeta:any ) {
    const params = {
      deposito,
      tarjeta
    };

    let head = new HttpHeaders({
      Authorization: this.apiService.token,
    });

    return this._http.post(
      environment.url + '/admin/ingresar-deposito-tarjeta',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }

  juntarDepositos(depositos:any) {
    const params = {
      depositos
    };

    let head = new HttpHeaders({
      Authorization: this.apiService.token,
    });

    return this._http.post(
      environment.url + '/admin/juntar-depositos',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }



  getSaldo( depositoId:number ) {
    const params = {
      depositoId
    };

    let head = new HttpHeaders({
      Authorization: this.apiService.token,
    });

    return this._http.post(
      environment.url + '/admin/get-saldo',
      params,
      {
        headers: this.apiService.authHeader,
      }
    );
  }
}
