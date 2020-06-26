import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../constants';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  consultaUrl: string = '/consultas/';

  constructor(private http: HttpClient) {}

  getConsultas() {
    return this.http.get<Consulta[]>(`${constants.apiUrl}${this.consultaUrl}`);
  }

  postConsulta(agenda_id: number, horario: string) {
    return this.http.post(`${constants.apiUrl}${this.consultaUrl}`, {
      agenda_id,
      horario,
    });
  }

  deleteConsulta(consulta_id: number) {
    return this.http.delete(
      `${constants.apiUrl}${this.consultaUrl}${consulta_id}/`
    );
  }
}
