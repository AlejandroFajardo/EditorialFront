import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = 'https://auth-dev.uptc.edu.co/auth/realms/UPTC-DEV/protocol/openid-connect/token';
  private previousKeycloackURL= environment.previousServerTokenURL;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'backend-starter');
    body.set('username', username);
    body.set('password', password);
    body.set('client_secret', '38a0cbf7-c67c-4cdd-89bd-36fdff2e8f28');

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.previousKeycloackURL, body.toString(), { headers });
  }
  getIdTercero(username: string,accessToken: string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(`${environment.tercerosApiUrl}/terceros/get-id/${username}`, {
      headers: headers
    });
  }
  getTerceroById(idTercero: number,accessToken:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(`${environment.tercerosApiUrl}/terceros/${idTercero}`, {
      headers: headers
    });
  }
}