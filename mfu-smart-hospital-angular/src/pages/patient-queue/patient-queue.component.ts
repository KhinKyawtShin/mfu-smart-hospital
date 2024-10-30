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
  queueNumber: number = 0;     // Current queue position
  totalQueues: number = 0;     // Total number of queues
  queueTime: string = '';      // Estimated wait time for the current queue

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQueueData();
  }

  fetchQueueData(): void {
    this.http.get<any>('http://localhost:1337/api/queues').subscribe(response => {
      if (response && response.data.length > 0) {
        let queueData = response.data;

        // Sort the queue data by queueTime to ensure correct order
        queueData.sort((a: any, b: any) => new Date(a.queueTime).getTime() - new Date(b.queueTime).getTime());
        this.totalQueues = queueData.length;

        // Generate a random current queue number between 1 and totalQueues
        this.queueNumber = Math.floor(Math.random() * this.totalQueues) + 1;

        // Check if the queueNumber is the last in the queue list
        if (this.queueNumber === this.totalQueues) {
          this.queueTime = '00 hours 00 minutes'; // No wait time for the last queue
        } else {
          // Calculate wait time based on time difference with the next queue
          const currentQueueTime = new Date(queueData[this.queueNumber - 1].queueTime).getTime();
          const nextQueueTime = new Date(queueData[this.queueNumber].queueTime).getTime();
          const timeDifferenceMinutes = Math.floor((nextQueueTime - currentQueueTime) / 60000);

          // Convert to hours and minutes
          const hours = Math.floor(timeDifferenceMinutes / 60);
          const minutes = timeDifferenceMinutes % 60;
          this.queueTime = `${hours} hours ${minutes} minutes`;
        }
      }
    });
  }

  goBack(): void {
    // Logic for the back button
  }
}
