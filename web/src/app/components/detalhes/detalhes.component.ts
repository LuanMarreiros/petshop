import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert/alert';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  @Input() alert:Alert;
  @Input() atendimentoId;

  token = document.cookie.split(';')[1].replace('token=', '').trim();
  atendimento;
  userName;

  constructor(private _atendimento:AtendimentoService, private _login: LoginService) { }

  ngOnInit(): void {
    this.getAtendimentos();
  }

  getAtendimentos(){
    this._atendimento.getFullAtendimentosById(this.token, this.atendimentoId.id).subscribe(data=>{
      if(data.data.message){
        this.alert.message = data.data.message;
      }else{
        this.atendimento = data.data[0];
        this._login.validateUserById(this.atendimento.id_usuario).subscribe(user=>{
          this.userName = user.data[0].nome_usuario;
        })
      }
    })
  }

  

}
