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
  doctorQueues: any[] = []; // Array to store queue information for each doctor

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQueueData();
  }

  fetchQueueData(): void {
    this.http.get<any>('http://localhost:1337/api/queues?populate=doctor').subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the API response

        if (response && response.data && response.data.length > 0) {
          const queueData = response.data;

          // Group patients by doctor and sort by queue number for each doctor
          const doctorQueueMap: { [doctorId: string]: any } = {};

          queueData.forEach((queue: any) => {
            const doctorId = queue.doctor?.id;
            if (doctorId) {
              if (!doctorQueueMap[doctorId]) {
                doctorQueueMap[doctorId] = { doctorName: queue.doctor.name, currentQueue: null, nextQueue: null };
              }

              // Set current queue if empty, otherwise set as next queue if queue number is higher
              if (!doctorQueueMap[doctorId].currentQueue) {
                doctorQueueMap[doctorId].currentQueue = queue.queueNumber;
              } else if (!doctorQueueMap[doctorId].nextQueue && queue.queueNumber > doctorQueueMap[doctorId].currentQueue) {
                doctorQueueMap[doctorId].nextQueue = queue.queueNumber;
              }
            }
          });

          // Convert map to an array for display
          this.doctorQueues = Object.values(doctorQueueMap);

          console.log('Filtered doctorQueues with next queue:', this.doctorQueues); // Log the filtered queues
        } else {
          console.warn('No data available in the API response.');
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

