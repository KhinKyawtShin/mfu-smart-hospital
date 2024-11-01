import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Location } from '@angular/common';  // Import Location service

@Component({
  selector: 'app-visit-time',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './visit-time.component.html',
  styleUrls: ['./visit-time.component.scss']
})
export class VisitTimeComponent implements OnInit {
  selectedDate: string = '';
  availableTimes: string[] = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00'];
  bookedTimes: Set<string> = new Set();

  constructor(private http: HttpClient, private location: Location) {}  // Inject Location service

  ngOnInit(): void {
    this.fetchBookedTimes();
  }

  fetchBookedTimes(): void {
    this.http.get<any>('http://localhost:1337/api/queues').subscribe(response => {
      if (response && response.data) {
        response.data.forEach((booking: any) => this.bookedTimes.add(booking.time));
      }
    });
  }

  isTimeAvailable(time: string): boolean {
    return !this.bookedTimes.has(time);
  }

  bookTime(time: string): void {
    if (this.isTimeAvailable(time)) {
      this.bookedTimes.add(time);
      alert(`You have booked the time slot: ${time}`);
    } else {
      alert('This time slot is already booked.');
    }
  }

  goBack(): void {
    this.location.back();  // Go back to the previous page
  }
}
