import {Component} from '@angular/core';
import {AppMainComponent} from '../app.main.component';
import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from '../app.component';
import { ConfigService } from './service/app.config.service';
import { AppConfig } from './service/app.config.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})

export class AppTopBarComponent {
	config: AppConfig;
    public userData: string;
    constructor(public appMain: AppMainComponent,
                private keycloak: KeycloakService,
				public app: AppComponent,
				public configService: ConfigService
    ) {
        keycloak.loadUserProfile().then(
			profile => {
				this.userData = profile.firstName + ' ' + profile.lastName;
			}, error => {
				console.error('Error al cargar perfil del usuario')
			});
    }
    logout() {
		this.keycloak.logout();
	}

	ngOnInit() {
		/*if (this.keycloak.getKeycloakInstance().profile.firstName) {
			this.userData = this.keycloak.getKeycloakInstance().profile.firstName + ' ';
		}
		if (this.keycloak.getKeycloakInstance().profile.lastName) {
			this.userData += this.keycloak.getKeycloakInstance().profile.lastName;
		}*/
	}
	onLayoutColorChange(event, color) {
        this.app.layoutColor = color;
        this.app.darkMenu = color === 'dark';

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutColor + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL);
        this.configService.updateConfig({...this.config, ...{dark: color.indexOf("light") === -1}});
    }
	replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
		
    }
	isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

}
