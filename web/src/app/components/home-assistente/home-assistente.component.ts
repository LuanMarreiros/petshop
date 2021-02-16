import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-home-assistente',
  templateUrl: './home-assistente.component.html',
  styleUrls: ['./home-assistente.component.scss']
})
export class HomeAssistenteComponent implements OnInit {

  user;

  constructor(private _router:Router, private _token:TokenService) { 
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
  }

  private verifyToken(){
    const data = {
      token: document.cookie.replace('token=', '')
    }

    this._token.validarToken(data).subscribe(data=>{
      if(!data.status){
        this._router.navigate(['/login']);
        return
      }
    });
  }

  goTo(url:string){
    this._router.navigate([url]);
  }

}
