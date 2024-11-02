import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
 selector: 'app-doctor',
 standalone: true,
 imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
 templateUrl: './doctor.component.html',
 styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
 doctors: any[] = [];


 constructor(private http:HttpClient) {}


 ngOnInit(): void{
   this.fetchDoctorData();
 }


 fetchDoctorData(): void {
   this.http.get<any>('http://localhost:1337/api/doctors').subscribe({
     next: (response) => {
       console.log('API Response:', response);
       this.doctors = response.data;
     },
     error: (err) => {
       console.error('Error fetching doctors:', err);
     } 
    
   })
 }


 goNext(): void {


 }


 goBack(): void {
 }
}
