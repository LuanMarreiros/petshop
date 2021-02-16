import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token/token';
import { Url } from 'src/app/shared/url';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _http:HttpClient, private _url:Url) { }

  validarToken(data: object):Observable<Token>{
    return this._http.post<Token>(this._url.url + 'token', data);
  }
}
