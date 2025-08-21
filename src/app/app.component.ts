import { Component, OnInit } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { KeycloakService } from "keycloak-angular";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    layoutMode = "overlay";
    layoutColor = "light";
    darkMenu = false;
    isRTL = false;
    inputStyle = "outlined";
    ripple = true;
    private redirected = false; // Para evitar múltiples redirecciones

    constructor(
        private primengConfig: PrimeNGConfig,
        private keycloak: KeycloakService,
        private router: Router
    ) {}

    async ngOnInit() {
        this.primengConfig.ripple = true;

        if (!this.redirected && (await this.keycloak.isLoggedIn())) {
            this.redirected = true;
            const roles = this.keycloak.getUserRoles();
            const ubs = this.keycloak.getKeycloakInstance();
            console.log("Roles detectados:", roles);

            if (roles.includes("PROFESOR")) {
                console.log("Redirigiendo a dashboard-profesor");
                this.router.navigate(["/dashboard-profesor"]);
            } else if (roles.includes("ASISTENTE_CENTRO")) {
                console.log("Redirigiendo a dashboard-asistente");
                this.router.navigate(["/dashboard-asistente"]);
            } else if (roles.includes("JEFE_CENTRO")) {
                console.log("Redirigiendo a dashboard-jefe");
                this.router.navigate(["/dashboard-jefe"]);
            } else if (
                roles.includes("EDITORA_JEFE") ||
                roles.includes("SECRETARIA_EDITORIAL") ||
                roles.includes("ASISTENTE_EDITORIAL")
            ) {
                console.log("Redirigiendo a dashboard-editorial");
                this.router.navigate(["/dashboard-editorial"]);
            } else {
                console.log("Redirigiendo a access");
                this.router.navigate(["/access"]);
            }
        }
    }

    logout() {
        this.keycloak.logout(window.location.origin); // Esto lleva al home después de logout
    }
}
