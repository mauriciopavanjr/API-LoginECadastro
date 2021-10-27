import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/RequestLogin';
import { ResponseLogin } from '../models/ResponseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpCliente: HttpClient) { }

  public doLogin(requestLogin: RequestLogin): Observable<ResponseLogin>{
    return this.httpCliente.post<ResponseLogin>('http://localhost:3000//auth/authenticate', requestLogin);
  }
}
