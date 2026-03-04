import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  getDocumentosList() {
    return this._http.get(environment.url + '/admin/get-documentos-list', {
      headers: this.apiService.authHeader,
    });
  }

  getDocumentoById(id: number) {
    const params = {
      id,
    };
    return this._http.post(
      environment.url + '/api/documento/get-by-id',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getDocumentosPorPersona(idPersona: number) {
    const params = {
      idPersona,
    };

    return this._http.post(
      environment.url + '/api/documento/get-list-by-persona',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getDocumentosPorPasajero(idPasajero: number) {
    const params = {
      idPasajero,
    };

    return this._http.post(
      environment.url + '/api/documento/get-list-by-pasajero',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getArchivosPorDocumento(idDocumento: number) {
    const params = {
      idDocumento,
    };

    return this._http.post(
      environment.url + '/api/documento/get-archivos-by-documento',
      params,
      { headers: this.apiService.authHeader }
    );
  }

}
