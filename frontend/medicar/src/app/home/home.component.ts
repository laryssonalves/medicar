import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../models/consulta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  consultas: Consulta[];

  constructor(
    private userService: UserService,
    private consultaService: ConsultaService
  ) {}

  ngOnInit(): void {
    this.loadConsultas();
  }

  loadConsultas() {
    this.consultaService.getConsultas().subscribe(
      (response) => {
        this.consultas = response;
      },
      () => {
        window.alert('Erro ao carregar consultas');
      }
    );
  }

  deleteConsulta(consulta_id: number) {
    this.consultaService.deleteConsulta(consulta_id).subscribe(
      () => {
        this.loadConsultas();
      },
      () => {
        window.alert('Erro ao tentar excluir consulta');
      }
    );
  }

  doLogout() {
    this.userService.logout();
    location.reload(true);
  }
}
