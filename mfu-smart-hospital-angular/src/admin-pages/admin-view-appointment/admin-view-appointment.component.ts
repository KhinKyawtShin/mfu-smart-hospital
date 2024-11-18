import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-admin-view-appointment',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, HttpClientModule, FormsModule, MatSelectModule, MatOptionModule],
  providers: [DatePipe],
  templateUrl: './admin-view-appointment.component.html',
  styleUrl: './admin-view-appointment.component.css'
})

export class AdminViewAppointmentComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  searchTerm: string = '';
  departments: any[] = [];
  doctors: any[] = [];
  selectedDepartment: string | null = null;
  selectedDoctor: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.fetchDepartments();
      this.fetchAppointmentData();
  }

  // Fetch all departments
  fetchDepartments(): void {
      this.http.get<any>('http://localhost:1337/api/departments').subscribe({
          next: (response) => {
              this.departments = response.data.map((dept: any) => ({
                  id: dept.id,
                  name: dept.name
              }));
          },
          error: (err) => {
              console.error('Error fetching departments:', err);
          }
      });
  }

  // Fetch doctors based on selected department
  onDepartmentChange(event: any): void {
    this.selectedDepartment = event.value;
    console.log('Selected Department ID:', this.selectedDepartment);
    
    // Fetch doctors when a department is selected
    if (this.selectedDepartment) {
      this.http.get<any>(`http://localhost:1337/api/doctors?populate=department`).subscribe({
        next: (response) => {
          this.doctors = response.data.filter((doc: any) => doc.department.id === this.selectedDepartment);
          console.log('Filtered Doctors:', this.doctors); 
        },
        error: (err) => {
          console.error('Error fetching doctors:', err);
        }
      });
    } else {
      this.doctors = [];
    }
    this.filterAppointments();
  }
  
  
  // Filter appointments when doctor is selected
  onDoctorChange(event: any): void {
    this.selectedDoctor = event.value;
    this.filterAppointments(); 
  }


  // Fetch all appointments
  fetchAppointmentData(): void {
      this.http.get<any>('http://localhost:1337/api/queues?populate[doctor][populate]=department&populate=users_permissions_user').subscribe({
          next: (response) => {
              this.appointments = response.data.map((queue: any) => ({
                  id: queue.id,
                  documentId: queue.documentId,
                  patientName: queue.users_permissions_user?.username || 'Unknown',
                  queueTime: queue.queueTime,
                  queueNumber: queue.queueNumber,
                  doctorId: queue.doctor?.id || null, 
                  departmentId: queue.doctor?.department?.id || null,
              }));
              this.filteredAppointments = [...this.appointments];
          },
          error: (err) => {
              console.error('Error fetching appointments:', err);
          }
      });
  }

  // Filter appointments based on department, doctor, and search term
  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment =>
        (!this.selectedDepartment || appointment.departmentId === this.selectedDepartment) &&
        (!this.selectedDoctor || appointment.doctorId === this.selectedDoctor) &&
        (!this.searchTerm || appointment.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
}

  // Delete appointment
  deleteAppointment(documentId: string): void {
      this.http.delete(`http://localhost:1337/api/queues/${documentId}`).subscribe({
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

  //search function
  search(): void {
    if (this.searchTerm) {
        this.filterAppointments(); 
    } else {
        this.filteredAppointments = [...this.appointments];
    }
}

//goBack function
goBack(): void {
  this.router.navigate(['/admin-login']);
}
}