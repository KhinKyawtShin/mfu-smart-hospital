import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-view-appointment',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, HttpClientModule],
  providers: [DatePipe],
  templateUrl: './admin-view-appointment.component.html',
  styleUrl: './admin-view-appointment.component.css'
})
export class AdminViewAppointmentComponent implements OnInit{
  appointments: any[] = [];

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  console.log('Initializing AdminViewAppointmentComponent');
  this.fetchAppointmentData();
}

fetchAppointmentData(): void {
  this.http.get<any>('http://localhost:1337/api/queues?populate=patient').subscribe({
    next: (response) => {
      console.log('API Response:', response);

      if (response && response.data && response.data.length > 0) {
        const queueData = response.data;

        // Map to store only the necessary appointment details
        this.appointments = queueData.map((queue: any) => ({
          id: queue.id,
          patientName: queue.patient?.name || 'Unknown', // Extract patient name, default to 'Unknown' if missing
          queueTime: queue.queueTime, // Use queueTime directly
          queueNumber: queue.queueNumber, // Queue number
          status: 'Pending' // Default status
        }));

        console.log('Appointments:', this.appointments); 
      } else {
        console.warn('No data available in the API response.');
      }
    },
    error: (err) => {
      console.error('Error fetching data:', err);
    }
  });
}


search(): void{
//write later
  }


editAppointment(): void{
//write later
}
}
