import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { DetalhesComponent } from '../detalhes/detalhes.component';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})

export class AgendamentosComponent implements OnInit{

  @Input() alert: any;
  @Input() atendimentoId: any;
  ELEMENT_DATA = [] ;


  displayedColumns: string[] = ['id_atendimento', 'nome_cliente', 'tipo_servico', 'data_atendimento', 'horario_atendimento', 'detalhes'];
  dataSource; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  atendimentos;
  token = document.cookie.split(';')[1].replace('token=', '').trim();
  constructor(private _atendimentos: AtendimentoService) {
 
  }

  ngOnInit(): void {
    this.loadForm();
    this.getAtendimento();
  }

  private loadForm() {
    this.form = new FormGroup({
      id_atendimento: new FormControl(null),
    })
  }

  private setDataSource(ELEMENT_DATA){
    this.dataSource = new MatTableDataSource(ELEMENT_DATA); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAtendimento() {
    this.atendimentos = null;
    this.alert.message = null;
    this._atendimentos.getAtendimentos(this.token).subscribe((data) => {
      if (data.data.message) {
        this.alert.message = data.data.message;
      } else {
        this.atendimentos = data.data;
        if(this.dataSource){
          this.dataSource.data = null;
          this.ELEMENT_DATA = [];
        } 
        data.data.forEach(atendimento=>{
          this.ELEMENT_DATA.push({ id_atendimento: atendimento.id_atendimento, nome_cliente: atendimento.nome_cliente, tipo_servico: atendimento.tipo_servico, data_atendimento: atendimento.data_atendimento, horario_atendimento: atendimento.horario_atendimento })
        })
        this.setDataSource(this.ELEMENT_DATA);
      }
    })
  }

  getAtendimentoById() {
    this.atendimentos = null;
    this.alert.message = null;
    if (this.form.value.id_atendimento) {
      this._atendimentos.getAtendimentosById(this.token, this.form.value.id_atendimento).subscribe(data => {
        if (data.data.message) {
          this.alert.message = data.data.message;
          this.atendimentos = null;
        } else {
          this.atendimentos = data.data;
          if(this.dataSource){
            this.dataSource.data = null;
            this.ELEMENT_DATA = [];
          } 
          data.data.forEach(atendimento=>{
            this.ELEMENT_DATA.push({ id_atendimento: atendimento.id_atendimento, nome_cliente: atendimento.nome_cliente, tipo_servico: atendimento.tipo_servico, data_atendimento: atendimento.data_atendimento, horario_atendimento: atendimento.horario_atendimento })
          })
          this.setDataSource(this.ELEMENT_DATA);
        }
      })
    } else {
      this.getAtendimento();
    }
  }

  goToDetalhes(id){
    this.atendimentoId.id = id; 
    this.alert.message = null;
    this.alert.componentToShow = "detalhes";
  }

}