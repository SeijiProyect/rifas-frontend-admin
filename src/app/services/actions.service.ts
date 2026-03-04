import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  loading: EventEmitter<boolean> = new EventEmitter();

  constructor(private _http: HttpClient) {}

  emitLoadingEvent(state: boolean | undefined) {
    this.loading.emit(state);
  }

  getLoadingStatus() {
    return this.loading;
  }

  setLoadingStatus(pBool: boolean | undefined) {
    this.emitLoadingEvent(pBool);
  }

  uploadImage(formData: any) {
    return this._http.post(environment.url + '/upload-image', formData);
  }
}
