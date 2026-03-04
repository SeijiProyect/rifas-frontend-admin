import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CompradorService {
  constructor(private _http: HttpClient, private apiService: ApiService) { }

  getCompradorById(id: number) {
    const params = {
      id
    };
    return this._http.post(
      environment.url + '/comprador/get-datos',
      params
    );
  }

}
