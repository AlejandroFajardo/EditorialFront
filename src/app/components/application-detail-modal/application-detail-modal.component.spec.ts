import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailModalComponent } from './application-detail-modal.component';

describe('ApplicationDetailModalComponent', () => {
  let component: ApplicationDetailModalComponent;
  let fixture: ComponentFixture<ApplicationDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
