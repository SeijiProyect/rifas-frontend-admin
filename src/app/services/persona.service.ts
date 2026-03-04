import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  getPersonasList(pageIndex: number) {
    const params = {
      pageIndex
    };

    return this._http.post(environment.url + '/persona/get-personas-list',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPersonasByFilter(pageIndex: number, termino: string, sexo: string, desde: number | string,
    hasta: number | string,) {
    const params = {
      pageIndex,
      termino,
      sexo,
      desde,
      hasta
    };

    return this._http.post(environment.url + '/persona/get-personas-filter',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPersonasByTermino(pageIndex: number, termino: string, sexo: string, desde: number | string,
    hasta: number | string,) {
    const params = {
      pageIndex,
      termino,
      sexo,
      desde,
      hasta
    };

    return this._http.post(environment.url + '/persona/get-personas-by-termino',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPersonasBySexo(pageIndex: number, termino: string, sexo: string, desde: number | string,
    hasta: number | string,) {
    const params = {
      pageIndex,
      termino,
      sexo,
      desde,
      hasta
    };

    return this._http.post(environment.url + '/persona/get-personas-by-sexo',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPersonasByFechas(pageIndex: number, termino: string, sexo: string, desde: number | string,
    hasta: number | string,) {
    const params = {
      pageIndex,
      termino,
      sexo,
      desde,
      hasta
    };

    return this._http.post(environment.url + '/persona/get-personas-by-fechas',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPersonasByFechasAndSexo(pageIndex: number, termino: string, sexo: string, desde: number | string,
    hasta: number | string,) {
    const params = {
      pageIndex,
      termino,
      sexo,
      desde,
      hasta
    };

    return this._http.post(environment.url + '/persona/get-personas-by-fechas-sexo',
      params,
      {
        headers: this.apiService.authHeader,
      });
  }

  getPersonaById(id: number) {
    const params = {
      id
    };
    return this._http.post(
      environment.url + '/persona/get-datos',
      params
    );
  }

  uploadFotoPersona(image: any, idPersona:string) {
    const params = {
      image,
      idPersona
    };
    return this._http.post(environment.url + '/api/persona/guardar-foto', params, {
      headers: this.apiService.authHeader,
    });
  }

  crearPersona(persona: any) {
    const params = {
      persona
    };
    return this._http.post(environment.url + '/api/persona/crear', params, {
      headers: this.apiService.authHeader,
    });
  }
  
  editarPersona(persona: any) {
    const params = {
      persona
    };
    return this._http.post(environment.url + '/api/persona/editar', params, {
      headers: this.apiService.authHeader,
    });
  }

}
