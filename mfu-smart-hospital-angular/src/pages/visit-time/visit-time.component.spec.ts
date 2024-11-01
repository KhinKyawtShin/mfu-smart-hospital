import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitTimeComponent } from './visit-time.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VisitTimeComponent', () => {
  let component: VisitTimeComponent;
  let fixture: ComponentFixture<VisitTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitTimeComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have available times defined', () => {
    expect(component.availableTimes.length).toBeGreaterThan(0);
  });

  it('should book an available time', () => {
    const time = component.availableTimes[0];
    component.bookTime(time);
    expect(component.bookedTimes.has(time)).toBeTrue();
  });

  it('should not book a booked time', () => {
    const time = component.availableTimes[0];
    component.bookedTimes.add(time);
    component.bookTime(time);
    expect(component.bookedTimes.size).toBe(1);  // Size should not increase
  });
});
