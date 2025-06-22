import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {NgModule} from '@angular/core';
import {FormLayoutDemoComponent} from './components/formDemo/formlayoutdemo.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import { AuthGuard } from './core/guard/app-auth-guard';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: InicioComponent,canActivate: [AuthGuard]},
                    { 
                        path: 'ejemplos/form', 
                        component: FormLayoutDemoComponent, 
                        canActivate: [AuthGuard],
                        data: { roles: ['backendUser'] } 
                    },
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
