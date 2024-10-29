import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-queue',
  templateUrl: './patient-queue.component.html',
  styleUrls: ['./patient-queue.component.css'],
  standalone: true,
})
export class PatientQueueComponent {
  queueNumber: number = 50;
  currentQueue: number = 23;
  estimatedWaitTime: string = '2 hours 10 minutes';

  goBack(): void {
    // Logic for the back button
  }
}
