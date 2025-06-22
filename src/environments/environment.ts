import { environment as defaultEnvironment } from './environment.defaults';

const keycloakConfig = {
	url: 'http://172.16.0.101:8080',
	realm: 'UPTC-DEV',
	clientId: 'backend-starter',
	authzClientId: 'backend-starter'
};

export const environment = {
	...defaultEnvironment,
	production: false,
	keycloakConfig,
	apiURL:"http://localhost:8081/",
	previousServerTokenURL:'https://auth-dev.uptc.edu.co/auth/realms/UPTC-DEV/protocol/openid-connect/token',
	tercerosApiUrl: "https://servicios3-dev.uptc.edu.co/SiTercerosBackEndKC",
	
	authUser: 'david.nunez',
  	authPass: '123456'
	
};