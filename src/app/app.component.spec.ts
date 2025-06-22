import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppMenuComponent } from './shared/app.menu.component';
import { AppTopBarComponent } from './shared/app.topbar.component';
import { AppFooterComponent } from './shared/app.footer.component';
import { AppBreadcrumbComponent } from './shared/app.breadcrumb.component';
import { AppBreadcrumbService } from './shared/app.breadcrumb.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule, ScrollPanelModule, TabViewModule
      ],
      declarations: [
          AppComponent,
          AppMainComponent,
          AppMenuComponent,
          AppTopBarComponent,
          AppFooterComponent,
          AppBreadcrumbComponent
      ],
      providers: [AppBreadcrumbService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
