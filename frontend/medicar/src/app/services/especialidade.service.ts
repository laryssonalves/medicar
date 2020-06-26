import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { constants } from '../constants';
import { Especialidade } from '../models/especialidade';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadeService {
  especialidadeUrl: string = '/especialidades/';

  constructor(private http: HttpClient) {}

  getEspecialidades() {
    return this.http.get<Especialidade[]>(
      `${constants.apiUrl}${this.especialidadeUrl}`
    );
  }
}
