import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTimeChenComponent } from './visit-time-chen.component';

describe('VisitTimeChenComponent', () => {
  let component: VisitTimeChenComponent;
  let fixture: ComponentFixture<VisitTimeChenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitTimeChenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitTimeChenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
