import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HttpClientModule, CommonModule], // Add CommonModule here
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  queue: any;
  patientName: string = 'Alex';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQueueByPatientName();
  }

  fetchQueueByPatientName(): void {
    const apiUrl = `http://localhost:1337/api/queues?populate[patient]=*&populate[doctor]=*&filters[patient][name][$eq]=${this.patientName}`;

    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.data && data.data.length > 0) {
          this.queue = data.data[0];
        } else {
          this.queue = null;
        }
      },
      error: (err) => {
        console.error('Error fetching queue data:', err);
        this.queue = null;
      }
    });
  }
}

