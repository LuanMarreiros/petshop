import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert/alert';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-home-assistente',
  templateUrl: './home-assistente.component.html',
  styleUrls: ['./home-assistente.component.scss']
})
export class HomeAssistenteComponent implements OnInit {

  user;
  alert = new Alert();

  constructor(private _router:Router, private _token:TokenService, private _login:LoginService,) { 
    this.verifyUser();
  }

  ngOnInit(): void {
  }

  private verifyUser(){
    this.user = this._router.getCurrentNavigation().extras.state ? this._router.getCurrentNavigation().extras.state.data : undefined;
    if(this.user && this.user.data[0].cargo_usuario != 'Assistente'){
      this._router.navigate(['/login']);
      return
    }
    this.verifyToken();
    this.getUserById();
  }

  private getUserById(){
    const id_usuario = parseInt(document.cookie.split(';')[0].replace('id_usuario=', '').trim());
    const setUserData = (data)=>{
      this.user = data;
    }
    this._login.validateUserById(id_usuario).subscribe(data=>{
      setUserData(data)
    });
  }

  private verifyToken(){
    const data = {
      token: document.cookie.split(';')[1].replace('token=', '').trim()
    }

    this._token.validarToken(data).subscribe(data=>{
      if(!data.status){
        this._router.navigate(['/login']);
        return
      }
    });
  }

  goTo(url:string){
    this.alert.componentToShow = url;
  }

}
