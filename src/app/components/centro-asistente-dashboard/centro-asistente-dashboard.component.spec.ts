import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroAsistenteDashboardComponent } from './centro-asistente-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: CentroAsistenteDashboardComponent;
  let fixture: ComponentFixture<CentroAsistenteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroAsistenteDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentroAsistenteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
