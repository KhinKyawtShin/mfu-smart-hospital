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
import{ ActivatedRoute, Router } from '@angular/router';

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
export class VisitTimeComponent implements OnInit {
  selectedCenter: string | null = null;
  selectedDoctor: string | null = null;
  selectedDoctorId: string | null = null;
  bookedTimes: Set<string> = new Set(); // Assuming bookedTimes holds strings of booked time slots

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCenter = params['center'] || null;
      this.selectedDoctor = params['doctor'] || null;
      this.selectedDoctorId = params['doctorId'] || null;
      console.log('Selected Center:', this.selectedCenter);
      console.log('Selected Dcotor:', this.selectedDoctor);
      console.log('Selected DoctorId:', this.selectedDoctorId);
    });
  }



  bookTime(time: TimeSlot): void {
    if (!time.booked) {
        time.booked = true; // Mark the slot as booked
        this.bookedTimes.add(time.time); // Assuming bookedTimes is a Set of strings
        console.log(`Booked time: ${time.time}`);
    }
}

  selectedDate: Date | null = null;
  selectedSlot: TimeSlot | null = null;
  timeSlots: TimeSlot[] = [
    { time: '09:00 - 09:20', booked: false },
    { time: '09:20 - 09:40', booked: false },
    { time: '09:40 - 10:00', booked: false },
    { time: '10:00 - 10:20', booked: false },
    { time: '10:20 - 10:40', booked: false },
    { time: '10:40 - 11:00', booked: false },
    { time: '11:00 - 11:20', booked: false },
    { time: '11:20 - 11:40', booked: false },
    { time: '11:40 - 12:00', booked: false },
    { time: '12:00 - 12:20', booked: false },
    { time: '12:20 - 12:40', booked: false },
    { time: '12:40 - 13:00', booked: false },
    { time: '13:00 - 13:20', booked: false },
    { time: '13:20 - 13:40', booked: false },
    { time: '13:40 - 14:00', booked: false },
    { time: '14:00 - 14:20', booked: false },
    { time: '14:20 - 14:40', booked: false },
    { time: '14:40 - 15:00', booked: false },
    { time: '15:00 - 15:20', booked: false },
    { time: '15:20 - 15:40', booked: false },
    { time: '15:40 - 16:00', booked: false },
  ];

  get availableTimes(): TimeSlot[] {
    return this.timeSlots.filter(slot => !slot.booked); // Dynamically get available slots
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.selectedSlot = null; // Clear selected slot when date changes
    // Implement logic to load available slots based on selectedDate if needed
  }

  bookSlot(slot: TimeSlot): void {
    if (!this.selectedDate) {
      console.log('Please select a date first.');
      return;
    }

    if (!slot.booked) {
      // If a different slot is selected, deselect the previous one
      if (this.selectedSlot) {
        this.selectedSlot.booked = false;
      }
      this.selectedSlot = slot; // Set the new selected slot
      slot.booked = true; // Mark as booked
      this.confirmBooking(slot); // Confirm booking with backend
    }
  }

  confirmBooking(slot: TimeSlot): void {
    console.log(`Booked slot: ${slot.time} on ${this.selectedDate}`);
  }

  goBack(): void {
    this.router.navigate(['/doctor']);
  }

  goNext(): void {
    if (this.selectedDate && this.selectedSlot) {
      console.log('Proceeding to the next step...');
      this.router.navigate(['/confirm-appointment'], {queryParams: {center: this.selectedCenter, doctor: this.selectedDoctor, doctorId: this.selectedDoctorId, date: this.selectedDate, time: this.selectedSlot.time}});
      console.log('Doctor:', (this.selectedDoctor ?? 'null') + this.selectedDoctorId, 'Selected date:', this.selectedDate, 'Selected time:', this.selectedSlot.time);
    } else {
      console.log('Please select a date and time slot first.');
    }
  }
}



