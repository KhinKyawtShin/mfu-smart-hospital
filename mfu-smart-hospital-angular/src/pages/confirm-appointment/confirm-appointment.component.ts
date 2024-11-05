import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-appointment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './confirm-appointment.component.html',
  styleUrl: './confirm-appointment.component.css'
})
export class ConfirmAppointmentComponent implements OnInit {
  patient: string= "gpuo23pktpz3m1djwn5xz6l6"
  doctor: string = "Dr. Inzali Moe Pyae";
  queueNumber: number=1009;
  dateTime: Date = new Date();
  doctorId: string = "u9sbsuuiwl3wn7qbvn86tm82";
  info: any;
   // Replace with your Strapi base URL

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchDoctorDepartment();
  }


  fetchDoctorDepartment() {
    const baseUrl: string = `http://localhost:1337/api/doctors/${this.doctorId}?populate=department`;
    this.http.get<any>(baseUrl).subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.data) {
          this.info = data.data; // Directly assign the fetched doctor info
          console.log(this.info.documentId);
        } else {
          this.info = null;
        }
      },
      error: (err) => {
        console.error('Error fetching doctor data:', err);
        this.info = null;
      }
    });
  }

  submitAppointment() {
    if (!this.info) {
      console.error('No doctor information available for submission.');
      return; // Exit if doctor information is not available
    }

    const appointmentData = {
      doctor: this.info.documentId, // Use doctor's ID for the relation
      patient: this.patient, 
      queueNumber: this.queueNumber,// Patient ID (you can adjust this based on how your patient is structured)
      queueTime: this.dateTime // Convert date to ISO string for submission
    };

    const baseUrl: string = 'http://localhost:1337/api/queues'; // API endpoint for your queue collection

    this.http.post(baseUrl, { data: appointmentData }).subscribe({
      next: (response) => {
        console.log('Appointment submitted successfully:', response);
        this.router.navigate(['/home-page']);
        // You might want to show a success message or navigate to another page here
      },
      error: (error) => {
        console.error('Error submitting appointment:', error);
      }
    });
  }
  
}