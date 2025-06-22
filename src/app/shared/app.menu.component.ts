import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {AppMainComponent} from '../app.main.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent,private keycloakService: KeycloakService) {}

    async ngOnInit() {

        const userRoles = await this.keycloakService.getUserRoles();

        this.model = [
            {
                label: 'Inicio', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Inicio UPTC', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'Menu', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'], badge: 6,
                items: [
                    {label: 'Ejemplo de form', icon: 'pi pi-fw pi-id-card', routerLink: ['/ejemplos/form'], permissions: ['backendUser']},
                ]
            },
        ];
        // New way to securely bring access based on user Roles instead of use directly Resources on Keycloak
        this.model = this.model.map(item => {
            if (item.items) {
              item.items = item.items.filter(subItem => {
                return this.hasPermission(subItem.permissions, userRoles);
              });
            }
            return item;
          });
        }
      
        hasPermission(requiredRoles: string[], userRoles: string[]): boolean {
          if (!requiredRoles) {
            return true;
          }
          return requiredRoles.every(role => userRoles.includes(role));
        }
    
    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
