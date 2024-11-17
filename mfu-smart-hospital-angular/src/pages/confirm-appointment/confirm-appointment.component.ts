import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, Time } from '@angular/common'; // Import CommonModule
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-confirm-appointment',
  standalone: true,
  providers:[UserService],
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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService,private location: Location) {}

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

  goBack(): void {
    this.location.back();
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
    
    console.log(this.doctorId);
    console.log(this.userService.getCurrentUser()?.documentId)
    console.log(this.queueNumber);
    console.log(this.date);
    console.log(this.time);

    const queueTime = new Date(`${this.date}T${this.time}:00`).toISOString();

    const appointmentData = {
      doctor: this.doctorId, // Use doctor's ID for the relation
      users_permissions_user: this.userService.getCurrentUser()?.documentId, 
      queueNumber: this.queueNumber,// Patient ID (you can adjust this based on how your patient is structured)
      queueTime: queueTime
    };
    console.log(queueTime);

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