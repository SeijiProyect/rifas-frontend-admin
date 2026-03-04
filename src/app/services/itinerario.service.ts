import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ItinerarioService {
  constructor(private _http: HttpClient, private apiService: ApiService) {}

  getItinerariosList( pGrupo:any ) {
    const params = { grupo: pGrupo };

    return this._http.post(environment.url + '/admin/get-itinerarios-by-grupo', 
    params,
    {
      headers: this.apiService.authHeader,
    });
  }

  getItinerarios() {
    return this._http.get(environment.url + '/itinerario/get-itinerarios', {
      headers: this.apiService.authHeader,
    });
  }

  getItinerariosByViaje( pViaje:number ) {
    const params = { viaje: pViaje };

    return this._http.post(environment.url + '/itinerario/get-itinerarios-by-viaje', 
    params,
    {
      headers: this.apiService.authHeader,
    });
  }

  getItinerariosByGrupo( pGrupo:number ) {
    const params = { grupo: pGrupo };

    return this._http.post(environment.url + '/itinerario/get-itinerarios-by-grupo', 
    params,
    {
      headers: this.apiService.authHeader,
    });
  }

}
