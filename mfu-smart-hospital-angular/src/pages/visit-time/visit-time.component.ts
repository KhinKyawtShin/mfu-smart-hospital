import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface TimeSlot {
  time: string;
  booked: boolean;
}

@Component({
  selector: 'app-visit-time',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './visit-time.component.html',
  styleUrls: ['./visit-time.component.css'],
})
export class VisitTimeComponent {
  selectedDate: Date | null = null;
  selectedSlot: TimeSlot | null = null;
  timeSlots: TimeSlot[] = [
    { time: '09:00 - 10:00', booked: true },
    { time: '10:00 - 11:00', booked: false },
    { time: '11:00 - 12:00', booked: false },
    { time: '12:00 - 13:00', booked: true },
    { time: '13:00 - 14:00', booked: false },
    { time: '14:00 - 15:00', booked: true }
  ];

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.selectedSlot = null; // Clear selected slot when date changes
    // Implement logic to load available slots based on selectedDate if needed
  }

  bookSlot(slot: TimeSlot): void {
    this.selectedSlot = slot; // Highlight the selected slot
    slot.booked = true; // Mark as booked
    this.confirmBooking(slot); // Confirm booking with backend
  }

  confirmBooking(slot: TimeSlot): void {
    // Placeholder for backend communication logic
    console.log(`Booked slot: ${slot.time} on ${this.selectedDate}`);
  }

  goBack(): void {
    console.log('Navigating back...');
  }
}


