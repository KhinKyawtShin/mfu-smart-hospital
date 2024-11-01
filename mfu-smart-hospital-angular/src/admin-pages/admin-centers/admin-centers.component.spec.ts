import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCentersComponent } from './admin-centers.component';

describe('AdminCentersComponent', () => {
  let component: AdminCentersComponent;
  let fixture: ComponentFixture<AdminCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCentersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
