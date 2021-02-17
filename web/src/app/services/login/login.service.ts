import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { Url } from '../../shared/url';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private url:Url) { }

  verifyUser(username:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.url.url + 'usuarios/' + username).pipe(
      take(1)
    );
  }

  verifyPassword(data: object):Observable<any>{
    return this.http.post(this.url.url + 'usuarios/psw', data).pipe(
      take(1)
    );
  }

  getUserById(id: number):Observable<any>{
    return this.http.get(this.url.url + 'usuarios/id/' + id).pipe(
      take(1)
    );
  }

  validateUserById(id: number):Observable<any>{
    return this.http.get(this.url.url + 'usuarios/validation/id/' + id).pipe(
      take(1)
    );
  }

}
