import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { constants } from '../constants';
import { Agenda } from '../models/agenda';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  agendaUrl: string = '/agendas/';

  constructor(private http: HttpClient) {}

  getAgenda(especialidade: number, medico: number) {
    const params = {
      params: new HttpParams({
        fromString: `especialidade=${especialidade}&medico=${medico}`,
      }),
    };
    return this.http.get<Agenda[]>(
      `${constants.apiUrl}${this.agendaUrl}`,
      params
    );
  }

  getHorarios(especialidade: number, medico: number, data: string) {
    const params = {
      params: new HttpParams({
        fromString: `especialidade=${especialidade}&medico=${medico}&data_inicio=${data}&data_final=${data}`,
      }),
    };
    return this.http.get<Agenda[]>(
      `${constants.apiUrl}${this.agendaUrl}`,
      params
    );
  }
}
