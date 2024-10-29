import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientQueueComponent } from './patient-queue.component';

describe('PatientQueueComponent', () => {
  let component: PatientQueueComponent;
  let fixture: ComponentFixture<PatientQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
