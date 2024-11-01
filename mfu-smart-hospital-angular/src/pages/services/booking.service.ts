// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookingData {
  date: string; // in YYYY-MM-DD format
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:1337/api/queues';

  constructor(private http: HttpClient) {}

  updateBooking(bookingData: BookingData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {
      data: bookingData
    });
  }
}



