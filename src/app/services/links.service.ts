import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private _http: HttpClient, private apiService: ApiService) { }

  updateLinkPagoRifa( linkPago: object ) {
    const params = {
      linkPago
    };

    return this._http.post(environment.url + '/link-pago-rifa/edit',
    params,
    {
      headers: this.apiService.authHeader,
    });
  }

  getLinksList(pageIndex: number) {
    const params = {
      pageIndex
    };

    return this._http.post(environment.url + '/link-pago-rifa/list',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getLinksByTermino(pageIndex: number, termino: string, estado: string) {
    const params = {
      pageIndex,
      termino,
      estado
    };

    return this._http.post(environment.url + '/link-pago-rifa-by-termino/list',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getLinksByEstado(pageIndex: number, estado: string) {
    const params = {
      pageIndex,
      estado
    };

    return this._http.post(environment.url + '/link-pago-rifa-by-estado/list',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getLinksByNumeroRifa(pageIndex: number, numero_rifa: number) {
    const params = {
      pageIndex,
      numero_rifa
    };

    return this._http.post(environment.url + '/link-pago-rifa-by-numero-rifa/list',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getLinksByTerminoAndEstado(pageIndex: number, termino: string, estado: string) {
    const params = {
      pageIndex,
      termino,
      estado
    };

    return this._http.post(environment.url + '/link-pago-rifa-by-termino-estado/list',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getLinksWithTalonesPendientes(pageIndex: number) {
    const params = {
      pageIndex  
    };

    return this._http.post(environment.url + '/link-pago-rifa/serchTalonesPendientes',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }


}
