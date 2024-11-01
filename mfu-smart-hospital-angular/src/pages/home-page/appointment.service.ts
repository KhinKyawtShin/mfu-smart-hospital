import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:1337/api/queues'; // Replace with your Strapi API URL for the "queue" collection
  constructor(private http: HttpClient) {}
  getQueueByPatientName(patientName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?filters[patient][$eq]=${patientName}`);
  }
}
