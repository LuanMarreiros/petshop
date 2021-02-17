import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private idUsuario: number;
  atualTab = 0;
  isUsernameValid = false;
  isPasswrodValid = true;
  errorMessage: string;
  form:FormGroup;

  constructor(private _login:LoginService, private _router:Router) { }

  ngOnInit(): void {
    this.loadForm();
  }

  private getUserById(){
    this._login.getUserById(this.idUsuario).subscribe(data=>{
      if(data.data[0].message){
        this.form.controls['password'].setErrors({ invalid: true })
        this.errorMessage = "Ocorreu um erro ao localizar usuário.";
      }else{
        document.cookie = `token = ${data.token}; expires=Sund, 2 May 2032 12:00:00 UTC;path:/token`;
        document.cookie = `id_usuario = ${data.data[0].id_usuario}; expires=Sund, 2 May 2032 12:00:00 UTC;path:/id_usuario`;
        this._router.navigateByUrl('', { state: { data: data } })
      }
    });
  }

  loadForm(){
    this.form = new FormGroup({
      user: new FormControl(null),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null),
    })
  }

  verifyUsername(){
    if(this.form.value.username){
      this._login.verifyUser(this.form.value.username).subscribe((data:any)=>{
        if(data.data[0] && data.data[0].username_usuario){
          this.isUsernameValid = true;
          this.isPasswrodValid = false;
          this.atualTab = 1;
          this.form.patchValue({ user: data.data[0].nome_usuario });
          this.idUsuario = data.data[0].id_usuario;
        }else{
          this.form.controls['username'].setErrors({ invalid: true })
          this.errorMessage = "Usuário não encontrado.";
        }
      });
    }else{
      this.form.controls['username'].setErrors({ invalid: true })
      this.errorMessage = "Username inválido!";
    }
  }

  verifyPassword(){
    const data = {
      id_usuario: this.idUsuario,
      senha_usuario: this.form.value.password
    }

    this._login.verifyPassword(data).subscribe(data=>{
      if(data.data.autenticado){
        this.getUserById();
      }else{
        this.form.controls['password'].setErrors({ invalid: true })
        this.errorMessage = "Senha inválida!";
      }
    });
  }

}
