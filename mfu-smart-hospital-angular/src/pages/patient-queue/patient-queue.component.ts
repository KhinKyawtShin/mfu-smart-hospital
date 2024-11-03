import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueueService } from '../services/queue.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-queue',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './patient-queue.component.html',
  styleUrls: ['./patient-queue.component.css']
})
export class PatientQueueComponent implements OnInit {
  userQueue: any | null = null;  // Store the queue information from the home page

  constructor(private router: Router, private queueService: QueueService) {}

  ngOnInit(): void {
    // Retrieve patient data passed from HomePageComponent
    this.userQueue = this.queueService.getPatientData();
    console.log('Patient data received in patient queue:', this.userQueue);
  }

  goBack(): void {
    this.router.navigate(['/home-page']);
  }
}



