import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RifaService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  getRifasByPasajero() {
    return this._http.get(environment.url + '/api/talon/get-by-pasajero', {
      headers: this.apiService.authHeader,
    });
  }

  getRifaById(id: number) {
    const params = {
      id
    };
    return this._http.post(
      environment.url + '/rifa/get-datos',
      params
    );
  }

  // NEW
  getRifasNew(
    loteDatos: number,
    pageRegisterLimit: number,
    pageIndex: number,
    status: string,
    desde: number | string,
    hasta: number | string,
    pasajero: number | string,
    selectedRifa: number | string,
    selectedSorteo: number | string,
  ) {
    const params = {
      loteDatos,
      pageRegisterLimit,
      pageIndex,
      status,
      desde,
      hasta,
      pasajero,
      selectedRifa,
      selectedSorteo
    };

    return this._http.post(environment.url + '/admin/get-rifas-list-new', params, {
      headers: this.apiService.authHeader,
    });
  }

  getRifasFilter(
    loteDatos: number,
    pageRegisterLimit: number,
    pageIndex = 0,
    status: string,
    desde: number | string,
    hasta: number | string,
    pasajero: number | string,
    selectedRifa: number | string,
    selectedSorteo: number | string,
  ) {
    const params = {
      loteDatos,
      pageRegisterLimit,
      pageIndex,
      status,
      desde,
      hasta,
      pasajero,
      selectedRifa,
      selectedSorteo
    };

    return this._http.post(environment.url + '/admin/get-rifas-list-filter', params, {
      headers: this.apiService.authHeader,
    });
  }

  getRifas(
    pageIndex = 0,
    status: string,
    desde: number | string,
    hasta: number | string,
    pasajero: number | string,
    all: boolean = false
  ) {
    const params = {
      pageIndex,
      status,
      desde,
      hasta,
      pasajero,
      all
    };

    return this._http.post(environment.url + '/admin/get-rifas-list', params, {
      headers: this.apiService.authHeader,
    });
  }

  asignarDepositoATalones(depId: number, talones: any[], comprador: any) {
    const params = {
      depositoId: depId,
      talones,
      comprador
    };

    return this._http.post(environment.url + '/admin/asignar-deposito-talones', params, {
      headers: this.apiService.authHeader,
    });
  };

  entregarRifas(
    desde: number | string,
    hasta: number | string,
    pasajero: number | string
  ) {
    const params = {
      desde,
      hasta,
      pasajero,
    };

    return this._http.post(environment.url + '/admin/entregar-rifas', params, {
      headers: this.apiService.authHeader,
    });
  }

  entregaRifas(entregaRifa: any
  ) {
    const params = {
      entregaRifa
    };

    return this._http.post(environment.url + '/admin/entrega-rifas', params, {
      headers: this.apiService.authHeader,
    });
  }

  getRifasToTransferByPasajero() {
    return this._http.get(
      environment.url + '/api/talon/get-rifas-to-transfer',
      { headers: this.apiService.authHeader }
    );
  }

  getRifasParaEntregar() {
    return this._http.get(
      environment.url + '/api/talon/get-rifas-para-entregar',
      { headers: this.apiService.authHeader }
    );
  }

  getRifasARecibir() {
    return this._http.get(environment.url + '/api/talon/get-rifas-a-recibir', {
      headers: this.apiService.authHeader,
    });
  }

  rifaEntregada(num: any) {
    let params = {
      rifas: num,
    };

    return this._http.post(
      environment.url + '/api/talon/rifa-entregada',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  putRifaBolsa(rifas: any) {
    let params = {
      rifas,
    };

    return this._http.post(
      environment.url + '/api/talon/put-rifa-bolsa',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  solicitarRifas(rifas: any) {
    let params = {
      rifas,
    };

    return this._http.post(
      environment.url + '/api/talon/solicitar-rifas',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  transferenciaDirecta(rifas: any, mailTransf: string) {
    let params = {
      rifas,
      mailTransf,
    };

    return this._http.post(
      environment.url + '/api/talon/transferencia-directa',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  quitarRifaBolsa(num: any) {
    let params = {
      numeroRifa: num,
    };

    return this._http.post(
      environment.url + '/api/talon/quitar-rifa-bolsa',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getBolsa() {
    return this._http.get(environment.url + '/api/talon/get-bolsa', {
      headers: this.apiService.authHeader,
    });
  }

  getBolsaByPasajero() {
    return this._http.get(
      environment.url + '/api/talon/get-bolsa-by-pasajero',
      { headers: this.apiService.authHeader }
    );
  }

  registerTalones(
    pComprador: {
      Nombre: string;
      Apellido: string;
      Email: string;
      Celular: string;
      Departamento: string;
    },
    pTalones: any[],
    pDepositoId: any
  ) {
    let params = {
      comprador: pComprador,
      talones: pTalones,
      deposito_id: pDepositoId,
    };

    return this._http.post(
      environment.url + '/api/talon/register-talones',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  getLinkPago(pData: any) {
    let params = pData;

    return this._http.post(
      environment.url + '/api/talon/generate-link',
      params,
      { headers: this.apiService.authHeader }
    );
  }

  validateRifaToken(pToken: any) {
    let params = {
      token: pToken,
    };

    return this._http.post(environment.url + '/talon/validate-link', params, {
      headers: this.apiService.commonHeader,
    });
  }

  uploadImage(formData: any) {
    return this._http.post(
      environment.url + '/upload-image/aeropuertos',
      formData
    );
  }

  deletePago(pId: any) {
    let params = {
      talon_id: pId,
    };

    return this._http.post(environment.url + '/api/talon/delete-pago', params, {
      headers: this.apiService.authHeader,
    });
  }
  /***  SERVICIOS RIFA GENERIA (NUEVOS)*/
  crearRifa(rifa: any) {
    const params = {
      rifa
    };
    return this._http.post(environment.url + '/api/rifa/crear', params, {
      headers: this.apiService.authHeader,
    });
  }

  delete(id: number) {
    const params = {
      id
    };

    return this._http.post(environment.url + '/api/rifa/delete',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getRifasActivas() {
    return this._http.post(environment.url + '/admin/rifa/list-activas', {
      headers: this.apiService.authHeader,
    });
  }

  editarRifa(rifa: any) {
    const params = {
      rifa
    };
    return this._http.post(environment.url + '/api/rifa/editar', params, {
      headers: this.apiService.authHeader,
    });
  }
}
