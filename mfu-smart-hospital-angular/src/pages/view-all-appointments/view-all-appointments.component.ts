import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QueueService } from '../../services/queue.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { Location } from '@angular/common';  // Import Location service

@Component({
  selector: 'app-view-all-appointments',
  standalone: true,
  providers: [DatePipe,UserService],
  imports: [HeaderComponent, DatePipe, HttpClientModule, CommonModule, FooterComponent],
  templateUrl: './view-all-appointments.component.html',
  styleUrls: ['./view-all-appointments.component.css']
})
export class ViewAllAppointmentsComponent implements OnInit {

  patientName: string = 'lynn';  // You might retrieve this from a service or session
  queueArray: any[] = [];  // Array to store multiple queues

  constructor(
    private http: HttpClient, 
    private queueService: QueueService,
    private location: Location,  // Inject Location service
    private userService: UserService  // Inject UserService to fetch current user
  ) {}

  ngOnInit(): void {
    // Retrieve the username from UserService
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      console.log('Logged in as:', currentUser.username);
      this.patientName = currentUser.username;
      this.fetchQueueByPatientData();
    } else {
      console.warn('No user is logged in.');
    }
  }

  fetchQueueByPatientData(): void {
    const apiUrl = `http://localhost:1337/api/queues?populate[users_permissions_user]=*&populate[doctor]=*&filters[users_permissions_user][username][$eq]=${this.patientName}&sort[queueTime]=asc`;
  
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.data && data.data.length > 0) {
          // Store the entire array of queues instead of just one
          this.queueArray = data.data;
  
          console.log('Queue Array:', this.queueArray);  // Log the full array
          // Pass the entire array to the queue service (assuming it's designed to handle multiple queues)
          this.queueService.setPatientData(this.queueArray);
          this.fetchDoctorImages();  // Now it will handle fetching images for all doctors
        } else {
          this.queueArray = [];  // Clear the array if no data is returned
        }
      },
      error: (err) => {
        console.error('Error fetching queue data:', err);
        this.queueArray = [];  // Clear the array in case of an error
      }
    });
  }

  // Modified to handle multiple doctor images for the entire queueArray
  fetchDoctorImages(): void {
    this.queueArray.forEach((queue) => {
      if (queue?.doctor?.documentId) {
        const doctorId = queue.doctor.documentId;
        const apiUrl = `http://localhost:1337/api/doctors/${doctorId}?populate=*`;

        this.http.get<any>(apiUrl).subscribe({
          next: (response) => {
            console.log('Doctor Image API Response:', response);
            if (response && response.data) {
              queue.doctorImageUrl = `http://localhost:1337` + response.data.image?.url || '';
              console.log('Doctor Image URL:', queue.doctorImageUrl);
            } else {
              console.warn('No image data available for the doctor.');
            }
          },
          error: (err) => {
            console.error('Error fetching doctor image:', err);
          }
        });
      }
    });
  }

  goBack(): void {
    this.location.back();  // Navigate back to the previous page
  }
}
