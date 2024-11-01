import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-patient-queue',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './patient-queue.component.html',
  styleUrls: ['./patient-queue.component.css']
})
export class PatientQueueComponent implements OnInit {
  userQueue: any | null = null;  // Store the queue information for the logged-in user

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQueueData();
  }

  // Placeholder to get the logged-in patient's ID
  getLoggedInPatientId(): string {
    // Replace with real logic (e.g., from auth service or local storage)
    return 'logged-in-patient-id'; // Sample ID; replace with actual logged-in user ID
  }

  fetchQueueData(): void {
    const loggedInPatientId = this.getLoggedInPatientId(); // Get the logged-in patient ID

    this.http.get<any>('http://localhost:1337/api/queues?populate[doctor]=*&populate[patient]=*').subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the API response

        if (response && response.data && response.data.length > 0) {
          const queueData = response.data;

          // Filter the queue data for the logged-in patient
          this.userQueue = queueData.find((queue: any) => queue.patient?.id === loggedInPatientId) || null;

          console.log('Filtered queue for logged-in user:', this.userQueue); // Log the filtered queue
        } else {
          console.warn('No data available in the API response.');
          this.userQueue = null;  // Clear if no data
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err); // Log error if API fails
      }
    });
  }

  goBack(): void {
    // Logic for the back button (if needed)
  }
}



