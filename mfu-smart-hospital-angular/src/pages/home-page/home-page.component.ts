import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { QueueService } from '../../services/queue.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  providers: [DatePipe,UserService], //Noelle added this one XD
  imports: [HeaderComponent, FooterComponent, HttpClientModule, CommonModule], // Add CommonModule here
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  queue: any;


  constructor(private http: HttpClient, private router: Router, private queueService: QueueService, private userService: UserService) {}
  patientName: string = '';
  

  ngOnInit(): void {
        // Retrieve the username from UserService
        const currentUser = this.userService.getCurrentUser();
        if (currentUser) {
          console.log('Logged in as:', currentUser.username);
          this.patientName = currentUser.username;
          this.fetchQueueByPatientData();
          //this.fetchDoctorImage();
        } else {
          console.warn('No user is logged in.');
          this.queue = null;
        }
  }

  fetchQueueByPatientData(): void {
    const apiUrl = `http://localhost:1337/api/queues?populate[users_permissions_user]=*&populate[doctor]=*&filters[users_permissions_user][username][$eq]=${this.patientName}`;
    
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.data && data.data.length > 0) {
          this.queue = data.data[0];

          console.log('Queue Time:', this.queue.queueTime);//Noelle added this one XD
          this.queueService.setPatientData(this.queue);//Noelle added this one XD
          this.fetchDoctorImage();
        } else {
          this.queue = null;
        }
      },
      error: (err) => {
        console.error('Error fetching queue data:', err);
        this.queue = null;
      }
    });
  }

  fetchDoctorImage(): void {
    if (!this.queue || !this.queue.doctor?.documentId) {
      console.warn('Doctor information is not available to fetch the image.');
      return;
    }
  
    const doctorId = this.queue.doctor.documentId;
    const apiUrl = `http://localhost:1337/api/doctors/${doctorId}?populate=*`;
  
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        console.log('Doctor Image API Response:', response);
        if (response && response.data) {
          this.queue.doctorImageUrl = `http://localhost:1337` + response.data.image?.url || '';
          console.log('Doctor Image URL:', this.queue.doctorImageUrl);
        } else {
          console.warn('No image data available for the doctor.');
        }
      },
      error: (err) => {
        console.error('Error fetching doctor image:', err);
      }
    });
  }
  

   //Noelle added this one XD
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  goToQueuePage(): void {
    this.router.navigate(['/patient-queue']);
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  makeAppointment(): void {
    this.router.navigate(['/centers']);
  }

  makeMedicalCheckup(): void {
    this.router.navigate(['/visit-time']);
  }
}

