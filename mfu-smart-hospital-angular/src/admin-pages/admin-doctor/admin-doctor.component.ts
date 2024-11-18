import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FooterComponent } from '../../pages/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-doctor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AdminHeaderComponent, FooterComponent, CardComponent],
  templateUrl: './admin-doctor.component.html',
  styleUrl: './admin-doctor.component.css'
})
export class AdminDoctorComponent {
  selectedCenter: string | null = null;
  selectedDoctor: string | null = null;
  selectedDoctorId: string | null = null;
  doctors: any[] = [];
  filteredDoctors: any[] = []; // Store filtered doctors
  baseUrl: string = 'http://localhost:1337'

 constructor(private http:HttpClient, private route: ActivatedRoute, private router: Router) {}


 ngOnInit(): void{
  this.route.queryParams.subscribe(params => {
    this.selectedCenter = params['center'] || null;
    console.log('Selected Center:', this.selectedCenter);
  });
   this.fetchDoctorData();
 }


 fetchDoctorData(): void {
   this.http.get<any>('http://localhost:1337/api/doctors?populate=*').subscribe({
     next: (response) => {
      console.log('API Response:', response);
      if (response && response.data && response.data.length > 0){
        this.doctors = response.data.map((doctor: any)=> ({
          name: doctor.name,
          documentId: doctor.documentId,
          department: doctor.department.name,
          imageUrl: this.baseUrl + doctor.image.url,
        }));

        this.filteredDoctors = this.selectedCenter 
            ? this.doctors.filter(doctor => doctor.department === this.selectedCenter)
            : this.doctors;

      } else {
        console.warn('No doctors available in API response.');
      }
    },
    error: (err) => {
      console.error('Error fetching centers data:', err);
    }
    
   })
 }

  chooseDoctor(doctorName: string): void {
    this.selectedDoctor = doctorName;
    this.selectedDoctorId = this.filteredDoctors.find(doctor => doctor.name === doctorName)?.documentId;
    console.log(this.selectedDoctorId);
  }

  goNext(): void {
    this.router.navigate(['/admin-view-appointment'], { queryParams: { center: this.selectedCenter, doctor: this.selectedDoctor, doctorId: this.selectedDoctorId } });
  }


  goBack(): void {
    this.router.navigate(['/admin-centers']);
  }
}
