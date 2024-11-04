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
  url = `http://localhost:1337/api/queues`;


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
          documentId: queue.documentId,
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

deleteAppointment(documentId: string): void {
  console.log({documentId});
  this.http.delete(`${this.url}/${documentId}`).subscribe({
    next: () => {
      this.appointments = this.appointments.filter(queue => queue.documentId !== documentId);
      this.filteredAppointments = this.filteredAppointments.filter(queue => queue.documentId !== documentId);
      console.log('Appointment deleted successfully');
    },
    error: (err) => {
      console.error('Error deleting appointment:', err);
    }
  });
}

/*deleteAppointment(documentId: number): void {
  const url = `http://localhost:1337/api/queues/${documentId}`; // Make sure this is the correct endpoint
  console.log('Attempting to delete appointment with Document ID:', documentId); // Debug log
  console.log('Delete URL:', url); // Log constructed URL
  
  this.http.delete(url).subscribe({
    next: () => {
      console.log('Delete response:'); // Log response
      // Optionally, remove the deleted appointment from the UI if needed
      this.appointments = this.appointments.filter(queue => queue.documentId !== documentId);
      this.filteredAppointments = this.filteredAppointments.filter(queue => queue.documentId !== documentId);
      console.log('Appointment deleted successfully');
    },
    error: (err) => {
      console.error('Error deleting appointment:', err);
    }
  });
}*/


}