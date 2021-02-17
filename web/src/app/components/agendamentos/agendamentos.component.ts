import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {
  @Input() alert: any;

  form: FormGroup;
  atendimentos;
  cliente;
  token = document.cookie.split(';')[1].replace('token=', '').trim();
  constructor(private _atendimentos: AtendimentoService, private _cliente: ClienteService, private _router:Router) { }

  ngOnInit(): void {
    this.loadForm();
    setTimeout(() => {
      this.getAtendimento();
    }, 200);
  }

  private loadForm() {
    this.form = new FormGroup({
      id_atendimento: new FormControl(null),
    })
  }

  getAtendimento() {
    this.atendimentos = null;
    this.alert.message = null;
    this._atendimentos.getAtendimentos(this.token).subscribe(data => {
      if (data.data.message) {
        console.log(data.data.message)
        this.alert.message = data.data.message;
      } else {
        this.atendimentos = data.data;
      }
    })
  }

  getAtendimentoById() {
    this.atendimentos = null;
    this.alert.message = null;
    if (this.form.value.id_atendimento) {
      this._atendimentos.getAtendimentosById(this.token, this.form.value.id_atendimento).subscribe(data => {
        if (data.data.message) {
          console.log(data.data.message)
          this.alert.message = data.data.message;
          this.atendimentos = null;
        } else {
          this.atendimentos = data.data;
        }
      })
    } else {
      this.getAtendimento();
    }
  }

  goToDetalhes(id){

    this.alert.componentToShow = "detalhes"

  }

}
