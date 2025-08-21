import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroJefelDashboardComponent } from './centro-jefe-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: CentroJefelDashboardComponent;
  let fixture: ComponentFixture<CentroJefelDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroJefelDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentroJefelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
