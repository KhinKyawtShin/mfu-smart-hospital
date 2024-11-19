import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAppointmentsComponent } from './view-all-appointments.component';

describe('ViewAllAppointmentsComponent', () => {
  let component: ViewAllAppointmentsComponent;
  let fixture: ComponentFixture<ViewAllAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
