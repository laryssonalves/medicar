import { Especialidade } from './especialidade';

import { Medico } from './medico';

export class Consulta {
  id: number;
  dia: Date;
  horario: string;
  medico: Medico;
}
