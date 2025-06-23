import { environment as defaultEnvironment } from './environment.defaults';

// ========================
// Keycloak config PRODUCCIoN/UPTC (comentado)
// ========================
// const keycloakConfig = {
// 	url: 'http://172.16.0.101:8080',
// 	realm: 'UPTC-DEV',
// 	clientId: 'backend-starter',
// 	authzClientId: 'backend-starter'
// };

// ========================
// Keycloak config LOCAL (desarrollo)
// ========================
const keycloakConfig = {
	url: 'http://localhost:8080',        // <-- Cambiado a localhost
	realm: 'UPTC-DEV',                   // <-- Usa el realm local (igual que prod, o como lo creaste)
	clientId: 'frontend-app',            // <-- Usa el clientId de tu cliente local
	authzClientId: 'frontend-app'         // <-- Igual que clientId
};

export const environment = {
	...defaultEnvironment,
	production: false,
	keycloakConfig,
	apiURL:"http://localhost:8081/",
	// ========================
	// Token URL PRODUCCIÓN (comentado)
	// previousServerTokenURL:'https://auth-dev.uptc.edu.co/auth/realms/UPTC-DEV/protocol/openid-connect/token',
	// ========================

	// ========================
	// Token URL LOCAL
	// ========================
	previousServerTokenURL:'http://localhost:8080/realms/UPTC-DEV/protocol/openid-connect/token',

	// ========================
	// tercerosApiUrl PRODUCCIÓN (comentado)
	// tercerosApiUrl: "https://servicios3-dev.uptc.edu.co/SiTercerosBackEndKC",
	// ========================

	// ========================
	// tercerosApiUrl LOCAL (opcional, solo si tienes un microservicio local)
	// ========================
	tercerosApiUrl: "http://localhost:8081/SiTercerosBackEndKC",

	//authUser: 'david.nunez',
  	//authPass: '123456'
	authUser: 'admin',       // <-- usuario creado en Keycloak local
  	authPass: 'admin'        // <-- contraseña asignada
	
};