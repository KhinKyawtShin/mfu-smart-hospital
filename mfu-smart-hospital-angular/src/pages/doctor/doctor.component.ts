import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CardComponent } from "../../components/card/card.component";


@Component({
 selector: 'app-doctor',
 standalone: true,
 imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent, CardComponent],
 templateUrl: './doctor.component.html',
 styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
 doctors: any[] = [];
 filteredDoctors: any[] = []; // Store filtered doctors


 constructor(private http:HttpClient) {}


 ngOnInit(): void{
   this.fetchDoctorData();
 }


 fetchDoctorData(): void {
   this.http.get<any>('http://localhost:1337/api/doctors?populate=*').subscribe({
     next: (response) => {
      console.log('API Response:', response);
      if (response && response.data && response.data.length > 0){
        this.doctors = response.data.map((doctor: any)=> ({
          name: doctor.name,
          department: doctor.department?.name
        }));
        this.filteredDoctors = this.doctors; // 
      } else {
        console.warn('No doctors available in API response.');
      }
    },
    error: (err) => {
      console.error('Error fetching centers data:', err);
    }
    
   })
 }

 filterDoctorsByDepartment(department: string): void {
  this.filteredDoctors = this.doctors.filter(doctor => doctor.department === department);
}


 goNext(): void {


 }


 goBack(): void {
 }
}
