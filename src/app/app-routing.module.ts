import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { FormLayoutDemoComponent } from "./components/formDemo/formlayoutdemo.component";
import { AppMainComponent } from "./app.main.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AuthGuard } from "./core/guard/app-auth-guard";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ApplicationFormComponent } from "./components/applicationForm/application-form.component";
import { EditorialDashboardComponent } from "./components/editorial-dashboard/editorial-dashboard.component";
import { ProfesorDashboardComponent } from "./components/profesor-dashboard/profesor-dashboard.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: "",
                    component: AppMainComponent,
                    children: [
                        /*{path: 'tabla', component: InicioComponent,canActivate: [AuthGuard]},
                    { 
                        path: 'ejemplo', 
                        component: FormLayoutDemoComponent, 
                        canActivate: [AuthGuard],
                        data: { roles: ['backendUser'] } 
                    },*/
                        {
                            path: "formulario",
                            component: ApplicationFormComponent,
                            canActivate: [AuthGuard],
                            data: { roles: ["PROFESOR"] },
                        },
                        {
                            path: "dashboard-profesor",
                            component: ProfesorDashboardComponent,
                            canActivate: [AuthGuard],
                            data: { roles: ["PROFESOR"] },
                        },
                        {
                            path: "dashboard-editorial",
                            component: EditorialDashboardComponent,
                            canActivate: [AuthGuard],
                            data: {
                                roles: [
                                    "EDITORA_JEFE",
                                    "SECRETARIA_EDITORIAL",
                                    "ASISTENTE_EDITORIAL",
                                ],
                            },
                        },
                        {
                            path: "dashboard-asistente",
                            component: EditorialDashboardComponent,
                            canActivate: [AuthGuard],
                            data: { roles: ["ASISTENTE_CENTRO"] },
                        },
                        {
                            path: "dashboard-jefe",
                            component: EditorialDashboardComponent,
                            canActivate: [AuthGuard],
                            data: { roles: ["JEFE_CENTRO"] },
                        },
                    ],
                },

                { path: "error", component: AppErrorComponent },
                { path: "access", component: AppAccessdeniedComponent },
                { path: "notfound", component: AppNotfoundComponent },
                { path: "**", redirectTo: "/notfound" },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
