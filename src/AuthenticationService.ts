import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import * as Keycloak from "keycloak-js";
import { environment } from "./environments/environment.dev";

@Injectable({
    providedIn: 'root',
  })
  
export class AuthenticationService {
    router = inject(Router);
    
    keycloak?: KeycloakService;

    

    async init() {
        return () =>
            this.keycloak.init({
              config: environment.keycloakConfig,
              initOptions: {
                  onLoad: 'check-sso',
                  checkLoginIframe: false
                },
                loadUserProfileAtStartUp: true,
                enableBearerInterceptor: true,
                bearerPrefix: 'Bearer',
      
              shouldAddToken: (request) => {
                  const { method, url } = request;
              
                  const isGetRequest = 'GET' === method.toUpperCase();
                  const acceptablePaths = ['/assets', '/clients/public'];
                  const isAcceptablePathMatch = acceptablePaths.some((path) =>
                    url.includes(path)
                  );
              
                  return !(isGetRequest && isAcceptablePathMatch);
                },
            });
    }
    
    async login(targetUrl?: string) {
        await this.keycloak?.login({
          redirectUri: location.origin + (targetUrl || '/')
        });
      }
    
      isLoggedIn() {
        return this.keycloak?.isLoggedIn;
      }
    
      isTokenExpired() {
        return this.keycloak?.isTokenExpired();
      }
    

    async getToken() {
      if (!this.isLoggedIn()) {
        return null;
      }
      if (this.isTokenExpired()) {
        try {
          await this.keycloak?.updateToken();
        } catch (error) {
          return null;
        }
      }
      return this.keycloak?.getKeycloakInstance();
    }
  
  }