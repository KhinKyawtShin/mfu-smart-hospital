import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-view-appointment',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, HttpClientModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './admin-view-appointment.component.html',
  styleUrl: './admin-view-appointment.component.css'
})
export class AdminViewAppointmentComponent implements OnInit{
  appointments: any[] = [];
  filteredAppointments: any[] = []; 
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  console.log('Initializing AdminViewAppointmentComponent');
  this.fetchAppointmentData();
}

fetchAppointmentData(): void {
  this.http.get<any>('http://localhost:1337/api/queues?populate=patient').subscribe({
    next: (response) => {
      if (response && response.data && response.data.length > 0) {
        const queueData = response.data;
        this.appointments = queueData.map((queue: any) => ({
          id: queue.id,
          patientName: queue.patient?.name || 'Unknown',
          queueTime: queue.queueTime,
          queueNumber: queue.queueNumber,
          status: 'Pending'
        }));

        this.filteredAppointments = [...this.appointments];
      } else {
        console.warn('No data available in the API response.');
      }
    },
    error: (err) => {
      console.error('Error fetching data:', err);
    }
  });
}

search(): void {
  if (this.searchTerm) {
    this.filteredAppointments = this.appointments.filter(queue =>
      queue.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else {
    this.filteredAppointments = [...this.appointments];
  }
}



editAppointment(): void{
//write later
}

deleteAppointment(): void{
//write later
}
}