import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QueueService } from '../services/queue.service';

@Component({
  selector: 'app-visit-time',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './visit-time.component.html',
  styleUrls: ['./visit-time.component.css']
})
export class VisitTimeComponent implements OnInit {
  queues: any[] = [];
  selectedDate: string = '';
  bookingResponse: string = '';

  constructor(private queueService: QueueService) {}

  ngOnInit(): void {
    this.fetchQueues();
  }

  fetchQueues(): void {
    this.queueService.getQueues().subscribe(
      (data) => {
        this.queues = data.data; // Adjust based on actual response structure
      },
      (error) => {
        console.error('Error fetching queues:', error);
      }
    );
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
  }

  bookSlot(queueId: number): void {
    const bookingData = {
      queueId: queueId,
      date: this.selectedDate,
    };

    this.queueService.addQueue({ data: bookingData }).subscribe(
      (response) => {
        this.bookingResponse = 'Booking successful!';
        this.fetchQueues();
      },
      (error) => {
        console.error('Error booking slot:', error);
        this.bookingResponse = 'Booking failed.';
      }
    );
  }
}

