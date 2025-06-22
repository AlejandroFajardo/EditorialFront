import {ApplicationConfig, NgModule, Provider} from '@angular/core';
import { APP_INITIALIZER} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';

import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppMenuComponent} from './shared/app.menu.component';
import {AppMenuitemComponent} from './shared/app.menuitem.component';
import {AppBreadcrumbComponent} from './shared/app.breadcrumb.component';
import {AppTopBarComponent} from './shared/app.topbar.component';
import {AppFooterComponent} from './shared/app.footer.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppBreadcrumbService} from './shared/app.breadcrumb.service';
import {MenuService} from './shared/app.menu.service';
import {ConfigService} from './shared/service/app.config.service';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { TableModule } from 'primeng/table';

import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { FormLayoutDemoComponent } from './components/formDemo/formlayoutdemo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthenticationInterceptor } from 'src/AuthenticationInterceptor';


export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: environment.keycloakConfig,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      bearerPrefix: 'Bearer',
      enableBearerInterceptor: false,
      bearerExcludedUrls: ['/assets', '/clients/public']
    });
}

@NgModule({
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BreadcrumbModule,
        ButtonModule,
        CardModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        KeycloakAngularModule,
		CoreModule,
        MenubarModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        RadioButtonModule,
        RippleModule,
        TableModule,
        SelectButtonModule,
        SidebarModule,
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        FormLayoutDemoComponent,
        InicioComponent,
    ],
    providers: [

          {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
          },                        
          provideHttpClient(),  //The new HttpClient in Angular 18, replace in all your components as needed,
                                //HttpClientModule is deprecated and will be removed 

        {provide: LocationStrategy, useClass: HashLocationStrategy},
        MenuService, AppBreadcrumbService, ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
