import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-visit-time-chen',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './visit-time-chen.component.html',
  styleUrl: './visit-time-chen.component.css',
})
export class VisitTimeChenComponent {
  selectedCenter: string | null = null;
  selectedDoctor: string | null = null;
  selectedDoctorId: string | null = null;
  bookedTimesByDate: { [date: string]: Set<string> } = {}; // Updated to store booked times by date
  availableTimes: { time: string; booked: boolean }[] = [];
  selectedDate: Date | null = null;
  selectedSlot: any = null;
  center: string | null = null; // Change to string
  doctor: string | null = null;  // Change to string
  doctorId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.center = params['center'] || null;
      this.doctor = params['doctor'] || null;
      this.doctorId = params['doctorId'] || null;
      console.log('Selected DoctorId:', this.doctorId); //
 //
    });
    this.fetchQueueByDoctorName();
    this.generateAvailableTimes();
  }

  // Fetch booked slots by doctor and organize by date
  fetchQueueByDoctorName(): void {
    const apiUrl = `http://localhost:1337/api/queues?populate[doctor]=*&filters[doctor][documentId][$eq]=zq43wj2fxhdvies0uke305j5`;
  
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log('Fetched queues:', data);
  
        if (data && data.data) {
          this.bookedTimesByDate = {};
  
          data.data.forEach((queue: any) => {
            const [queueDate, queueTime] = queue.queueTime.split('T'); // Splitting date and time
  
            // Convert the time to HH:mm in 24-hour format (without seconds and timezone)
            const dateTime = new Date(queue.queueTime);
            const formattedTime = dateTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: false // Ensures 24-hour format
            }); // "HH:mm"
  
            if (!this.bookedTimesByDate[queueDate]) {
              this.bookedTimesByDate[queueDate] = new Set();
            }
            this.bookedTimesByDate[queueDate].add(formattedTime);
          });
  
          console.log('Booked Times by Date:', this.bookedTimesByDate);
        } else {
          console.log('No booked slots for the selected doctor.');
          this.bookedTimesByDate = {};
        }
      },
      error: (err) => {
        console.error('Error fetching queue data:', err);
      },
    });
  }
  

  // Generate time slots and mark them as booked or available based on the selected date
  generateAvailableTimes(): void {
    const startHour = 9;
    const endHour = 17;
    const interval = 20;
    this.availableTimes = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        this.availableTimes.push({ time, booked: false });
      }
    }
  }

  // Update available times based on selected date
  updateAvailableTimes(selectedDate: string): void {
    const bookedTimesForDate = this.bookedTimesByDate[selectedDate] || new Set();
    this.availableTimes = this.availableTimes.map((slot) => ({
      ...slot,
      booked: bookedTimesForDate.has(slot.time),
    }));
  }

  // Handle date change, update available slots based on the selected date
  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.selectedSlot = null; // Clear selected slot when date changes
  
    if (this.selectedDate) {
      // Convert the selected date to a local date string (YYYY-MM-DD format) without timezone offset
      const selectedDateString = new Date(
        this.selectedDate.getTime() - this.selectedDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split('T')[0];
      
      this.updateAvailableTimes(selectedDateString);
      console.log('Updated available times for date:', selectedDateString);
    }
  }
  

  bookSlot(slot: any): void {
    this.selectedSlot = slot;
    console.log('Slot booked:', slot);
    console.log(this.selectedDate);
  }

  goBack(): void {
    this.router.navigate(['/previous-page']); // Adjust this route as needed
  }

  goNext(): void {
    if (this.selectedSlot && this.selectedDate) {
      // Check if selectedSlot is an object, and extract the time string if necessary
      const formattedTime = typeof this.selectedSlot === 'string' ? this.selectedSlot : this.selectedSlot.time;
  
      // Manually format the date in local timezone
      const localDate = new Date(this.selectedDate);
      const localDateString = localDate.getFullYear() + '-' +
        String(localDate.getMonth() + 1).padStart(2, '0') + '-' +
        String(localDate.getDate()).padStart(2, '0');
  
      // Navigate to the next page and pass the date and time as separate query parameters
      this.router.navigate(['/confirm-appointment'], {
        queryParams: {
          center: this.center,
          doctor: this.doctor,
          doctorId: this.doctorId,
          date: localDateString,  // Local date (YYYY-MM-DD)
          time: formattedTime,    // Time in HH:mm
        },
      });
    } else {
      console.error('No slot selected');
    }
  }
  
  
}
