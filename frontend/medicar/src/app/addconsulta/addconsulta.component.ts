import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import { Router } from '@angular/router';

import { EspecialidadeService } from '../services/especialidade.service';
import { Especialidade } from '../models/especialidade';
import { MedicoService } from '../services/medico.service';
import { Medico } from '../models/medico';
import { AgendaService } from '../services/agenda.service';
import { Agenda } from '../models/agenda';

@Component({
  selector: 'app-addconsulta',
  templateUrl: './addconsulta.component.html',
  styleUrls: ['./addconsulta.component.css'],
})
export class AddconsultaComponent implements OnInit {
  consultaForm: FormGroup;
  submitted = false;

  especialidades: Especialidade[];
  medicos: Medico[];
  agendas: Agenda[];
  horarios: string[];

  constructor(
    private formBuilder: FormBuilder,
    private especialidadeService: EspecialidadeService,
    private medicoService: MedicoService,
    private agendaService: AgendaService,
    private consultaService: ConsultaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.especialidadeService.getEspecialidades().subscribe((response) => {
      this.especialidades = response;
    });
    this.initConsultaForm();
  }

  initConsultaForm(): void {
    this.consultaForm = this.formBuilder.group({
      especialidade: new FormControl(null, Validators.required),
      medico: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      agenda: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      hora: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
    });
  }

  onEspecialidadeChange() {
    this.consultaForm.get('medico').setValue(null);
    this.consultaForm.get('agenda').patchValue(null);
    this.consultaForm.get('hora').setValue(null);

    const { especialidade } = this.consultaForm.value;
    this.medicoService.getMedicos(especialidade).subscribe((response) => {
      this.medicos = response;
    });

    if (especialidade !== null) {
      this.consultaForm.get('medico').enable();
    } else {
      this.consultaForm.get('medico').disable();
    }
  }

  onMedicoChange() {
    this.consultaForm.get('agenda').patchValue(null);
    this.consultaForm.get('hora').setValue(null);

    const { especialidade, medico } = this.consultaForm.value;
    this.agendaService
      .getAgenda(especialidade, medico)
      .subscribe((response) => {
        this.agendas = response;
      });

    if (medico !== null) {
      this.consultaForm.get('agenda').enable();
    } else {
      this.consultaForm.get('agenda').disable();
    }
  }

  onAgendaChange() {
    const { especialidade, medico, agenda } = this.consultaForm.value;
    this.agendaService
      .getHorarios(especialidade, medico, agenda.dia)
      .subscribe((response) => {
        this.horarios = response[0].horarios;
      });

    if (agenda !== null) {
      this.consultaForm.get('hora').enable();
    } else {
      this.consultaForm.get('hora').disable();
    }
  }

  onSubmitForm(): void {
    event.preventDefault();
    this.submitted = true;
    const { agenda, hora } = this.consultaForm.value;
    this.consultaService.postConsulta(agenda.id, hora).subscribe(
      () => {
        this.router.navigateByUrl('/home');
      },
      (error) => {
        window.alert(error);
      }
    );
  }
}
