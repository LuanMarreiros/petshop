import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from 'src/app/shared/url';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient,private url:Url) { }

  getClienteById(id:number, token):Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
    return this.http.get<any>(this.url.url + 'cliente/id/'+id);
  }
}
