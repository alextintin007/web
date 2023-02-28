import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  //guardar libro
  //http://localhost:3600/guardar-libro
  login(username: string, password: string): Observable<any> {
    const body = { user: username, password };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url + 'login', body, { headers: headers });
  }
}