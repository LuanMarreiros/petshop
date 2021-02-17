import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Atendimento } from 'src/app/models/atendimento/atendimento';
import { Url } from 'src/app/shared/url';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {


  constructor(private http:HttpClient, private url:Url) { }

  getAtendimentos(token):Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
    return this.http.get<any>(this.url.url + 'atendimentos', httpHeader)
  }

  getAtendimentosById(token, id):Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
    return this.http.get<any>(this.url.url + 'atendimentos/' + id, httpHeader)
  }


}


