import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { PatientQueueComponent } from '../pages/patient-queue/patient-queue.component';
import { HeaderComponent } from "../pages/header/header.component";
import { FooterComponent } from "../pages/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, PatientQueueComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfu-smart-hospital';
}



