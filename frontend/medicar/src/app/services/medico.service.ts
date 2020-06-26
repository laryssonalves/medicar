import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { constants } from '../constants';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  medicoUrl: string = '/medicos/';

  constructor(private http: HttpClient) {}

  getMedicos(especialidade: number) {
    const params = {
      params: new HttpParams({ fromString: `especialidade=${especialidade}` }),
    };
    return this.http.get<Medico[]>(
      `${constants.apiUrl}${this.medicoUrl}`,
      params
    );
  }
}
