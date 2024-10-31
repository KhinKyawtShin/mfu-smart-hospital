import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAppointmentComponent } from './admin-view-appointment.component';

describe('AdminViewAppointmentComponent', () => {
  let component: AdminViewAppointmentComponent;
  let fixture: ComponentFixture<AdminViewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
