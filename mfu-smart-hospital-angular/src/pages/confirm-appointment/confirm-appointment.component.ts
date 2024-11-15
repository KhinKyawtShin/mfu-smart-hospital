import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Time } from '@angular/common'; // Import CommonModule
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-appointment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './confirm-appointment.component.html',
  styleUrl: './confirm-appointment.component.css'
})
export class ConfirmAppointmentComponent implements OnInit {
  center: string | null = null; //to display center name
  doctor: string | null = null;  //to display doctor name
  doctorId: string | null = null; //to post to strapi
  date: Date | null = null; //Fix to display with time
  time: string | null = null; //**** */
  patient: string | null = null;
  queueNumber: number=1009;
  info: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.center = params['center'] || null;
      this.doctor = params['doctor'] || null;
      this.doctorId = params['doctorId'] || null;
      this.date = params['date'] || null;
      this.time = params['time'] || null;
      console.log('Selected DoctorId:', this.doctorId); //
      console.log('Selected Date:', this.date); // 
      console.log('Selected Time:', this.time); //
    });
  }

  /*
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
  */
  submitAppointment() {
    if (!this.info) {
      console.error('No doctor information available for submission.');
      return; // Exit if doctor information is not available
    }

    const appointmentData = {
      doctor: this.doctorId, // Use doctor's ID for the relation
      patient: this.patient, 
      queueNumber: this.queueNumber,// Patient ID (you can adjust this based on how your patient is structured)
      queueTime: this.date && this.time
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