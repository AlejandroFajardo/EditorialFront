import {APP_INITIALIZER, ApplicationConfig, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';


import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

// Function to initialize Keycloak with the necessary configurations
function initializeKeycloak(keycloak: KeycloakService) {
 return () =>
   keycloak.init({
     // Configuration details for Keycloak
     config: {
       url: 'http://localhost:8080/auth', // URL real de tu Keycloak
        realm: 'UPTC-DEV',
        clientId: 'frontend-app' // Client ID for the application in Keycloak
     },
     // Options for Keycloak initialization
     initOptions: {
       onLoad: 'check-sso', // Action to take on load
       silentCheckSsoRedirectUri:
         window.location.origin + '/assets/silent-check-sso.html' // URI for silent SSO checks
     },
     // Enables Bearer interceptor
     enableBearerInterceptor: true,
     // Prefix for the Bearer token
     bearerPrefix: 'Bearer',
     // URLs excluded from Bearer token addition (empty by default)
     //bearerExcludedUrls: []
   });
}

// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
 provide: HTTP_INTERCEPTORS,
 useClass: KeycloakBearerInterceptor,
 multi: true
};

// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
 provide: APP_INITIALIZER,
 useFactory: initializeKeycloak,
 multi: true,
 deps: [KeycloakService]
}

// Exported configuration for the application
export const appConfig: ApplicationConfig = {
 providers: [
   provideHttpClient(withInterceptorsFromDi()), // Provides HttpClient with interceptors
   KeycloakInitializerProvider, // Initializes Keycloak
   KeycloakBearerInterceptorProvider, // Provides Keycloak Bearer Interceptor
   KeycloakService, // Service for Keycloak
   //provideRouter(routes) // Provides routing for the application
 ]
};