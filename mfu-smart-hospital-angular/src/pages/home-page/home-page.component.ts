import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] // Corrected from styleUrl to styleUrls
})
export class HomePageComponent {
  // You can add properties and methods here as needed
  /*queue: any; // Variable to hold the specific queue entry
  patientName: string = 'Alex';
  
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchQueueByPatientName();
  }

  fetchQueueByPatientName(): void {
    this.appointmentService.getQueueByPatientName(this.patientName).subscribe(data => {
      console.log(data);
      this.queue = data.data[0]; // Assuming the API returns an array and you want the first match
    });
  }*/
}
