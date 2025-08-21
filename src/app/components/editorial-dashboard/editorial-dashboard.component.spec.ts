import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialDashboardComponent } from './editorial-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: EditorialDashboardComponent;
  let fixture: ComponentFixture<EditorialDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
