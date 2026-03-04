import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PasajeroService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  updateItinerarioPasajeroById(id: number, idItinerario: number) {
    const params = {
      id,
      idItinerario,
    };

    return this._http.post(environment.url + '/pasajero/update-itinerario-pasajero',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosList() {
    return this._http.get(environment.url + '/admin/get-pasajeros-list', {
      headers: this.apiService.authHeader,
    });
  }

  getPasajeros(pageIndex: number) {
    const params = {
      pageIndex
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosByTermino(pageIndex: number, termino: string) {
    const params = {
      pageIndex,
      termino
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-by-termino',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosByViaje(pageIndex: number, idViaje: number) {
    const params = {
      pageIndex,
      idViaje
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-by-viaje',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosByItinerario(pageIndex: number, idItinerario: number) {
    const params = {
      pageIndex,
      idItinerario
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-by-itinerario',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosByEstado(pageIndex: number, estado: string) {
    const params = {
      pageIndex,
      estado
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-by-estado',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosByViajeEstado(pageIndex: number, estado: string, idViaje: number) {
    const params = {
      pageIndex,
      idViaje,
      estado
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosListFiltro(pageIndex: number, termino: string, estado: string, idViaje: number) {
    const params = {
      pageIndex,
      termino,
      estado,
      idViaje
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-lista',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getCostosExtrasByPasajero() {
    return this._http.get(environment.url + '/api/costos-extras', {
      headers: this.apiService.authHeader,
    });
  }

  getPasajeroItinerarioByUser() {
    return this._http.get(
      environment.url + '/api/pasajero/get-pasajero-itinerario-by-user',
      { headers: this.apiService.authHeader }
    );
  }

  getDepositosRegistrosListByUser() {
    return this._http.get(
      environment.url + '/api/pasajero/get-depositos-registros-list-by-user',
      { headers: this.apiService.authHeader }
    );
  }

  getDepositosRegistros() {
    return this._http.get(
      environment.url + '/api/pasajero/get-depositos-registros',
      { headers: this.apiService.authHeader }
    );
  }

  getDepositosTarjetasRegistros() {
    return this._http.get(
      environment.url +
      '/api/pasajero/get-depositos-tarjetas-registros-by-user',
      { headers: this.apiService.authHeader }
    );
  }

  getPasajeroByUser() {
    const params = {
      token: this.apiService.token,
    };

    return this._http.post(
      environment.url + '/api/pasajero/get-pasajero-by-user',
      params,
      { headers: this.apiService.authHeader }
    );
  }
  getPasajeroById(idPasajero: number) {
    const params = {
      idPasajero,
    };

    return this._http.post(
      environment.url + '/api/pasajero/get-pasajero-by-id-post',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getPasajeroActivoByPersona(idPersona: number) {
    const params = {
      idPersona,
    };

    return this._http.post(
      environment.url + '/api/pasajero/get-pasajero-activo-by-persona',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getItinerarioByPasajeroId(pPasajero: number) {
    const params = { pasajero: pPasajero };

    return this._http.post(environment.url + '/api/pasajero/get-pasajero-itinerario',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getCostosExtrasByPasajeroId(pPasajero: number) {
    const params = { pasajero: pPasajero };

    return this._http.post(environment.url + '/api/pasajero/get-pasajero-costos-extras',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getDepositosByPasajeroId(pPasajero: number) {
    const params = { pasajero: pPasajero };

    return this._http.post(environment.url + '/api/pasajero/get-pasajero-depositos',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }


  getPasajerosSaldosByViaje(idViaje: number) {
    const params = {
      idViaje
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-saldos-by-viaje',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosSaldosByItinerario(idItinerario: number) {
    const params = {
      idItinerario
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-saldos-by-itinerario',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosSaldosByViajeAndPorcentaje(idViaje: number, porcentaje: number) {
    const params = {
      idViaje,
      porcentaje
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-saldos-by-viaje-porcentaje',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPasajerosSaldosByItinerarioAndPorcentaje(idItinerario: number, porcentaje: number) {
    const params = {
      idItinerario,
      porcentaje
    };

    return this._http.post(environment.url + '/pasajero/get-pasajeros-saldos-by-itinerario-porcentaje',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }


}
