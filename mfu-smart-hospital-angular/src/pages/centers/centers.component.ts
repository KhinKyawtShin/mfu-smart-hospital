import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardComponent, CommonModule, HttpClientModule],
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {
  centers: any[] = []; // Array to store centers data
  selectedCenter: string | null = null;
  baseUrl: string = 'http://localhost:1337'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCentersData();
  }

  fetchCentersData(): void {
    this.http.get<any>('http://localhost:1337/api/departments?populate=*').subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the API response
        if (response && response.data && response.data.length > 0) {
          this.centers = response.data.map((center: any) => ({
            name: center.name,
            imageUrl: this.baseUrl + center.image.url // Update this based on your Strapi data structure
          }));
        } else {
          console.warn('No centers available in the API response.');
        }
      },
      error: (err) => {
        console.error('Error fetching centers data:', err);
      }
    });
  }

  chooseCenter(centerName: string) {
    this.selectedCenter = centerName;
  }

  goBack(): void {
    // Logic for back button (if needed)
  }

  goNext(): void {
    // Logic for next button (if needed)
  }
}
