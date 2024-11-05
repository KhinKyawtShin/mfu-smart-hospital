import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { PatientQueueComponent } from '../pages/patient-queue/patient-queue.component';
import { HeaderComponent } from "../pages/header/header.component";
import { FooterComponent } from "../pages/footer/footer.component";
import { DoctorComponent } from "../pages/doctor/doctor.component"
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CentersComponent } from '../pages/centers/centers.component';
import { VisitTimeComponent } from '../pages/visit-time/visit-time.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, PatientQueueComponent, HeaderComponent, FooterComponent, DoctorComponent, HomePageComponent, CentersComponent, VisitTimeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfu-smart-hospital';
}



