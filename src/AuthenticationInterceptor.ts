import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, from, lastValueFrom } from "rxjs";
import { KeycloakService } from "keycloak-angular";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private keycloak: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    //-----------Here we can add the exceptions----------------------------- 
    const tercerosApiBaseUrl = 'https://servicios3-dev.uptc.edu.co/SiTercerosBackEndKC';
    const isTercerosApi = req.url.startsWith(tercerosApiBaseUrl);

    //----If the URL Service is protected with previous keycloack-----------
    if (isTercerosApi) {
      return next.handle(req).toPromise();
    }
    //----------------------------------------------------------------------

    const token = await this.keycloak.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).toPromise();
  }
}