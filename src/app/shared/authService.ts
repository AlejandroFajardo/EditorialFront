import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = 'https://auth-dev.uptc.edu.co/auth/realms/UPTC-DEV/protocol/openid-connect/token';
  private previousKeycloackURL = environment.previousServerTokenURL;

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService
  ) {}

  // Login manual (solo si realmente lo usas en Angular)
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

  // Obtener id de tercero (de tu API de terceros)
  getIdTercero(username: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(`${environment.tercerosApiUrl}/terceros/get-id/${username}`, { headers });
  }

  // Obtener tercero por id (de tu API de terceros)
  getTerceroById(idTercero: number, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(`${environment.tercerosApiUrl}/terceros/${idTercero}`, { headers });
  }

  /** 
   * Obtiene datos básicos del usuario autenticado desde el token de Keycloak.
   * Devuelve: id (si está en el token), username, email, roles.
   */
  getUserProfile(): { id?: number, username: string, email: string, roles: string[] } {
    const tokenParsed: any = this.keycloak.getKeycloakInstance().tokenParsed;
    return {
      id: tokenParsed.id, // solo si el token tiene el id del usuario
      username: tokenParsed.preferred_username,
      email: tokenParsed.email,
      roles: tokenParsed.realm_access?.roles || []
    };
  }

  /**
   * Si necesitas buscar el usuario en tu backend por email:
   */
  getUsuarioByEmail(email: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/usuarios/by-email/${email}`);
  }
}
