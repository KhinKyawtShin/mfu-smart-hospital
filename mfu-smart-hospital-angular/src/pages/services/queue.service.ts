import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private apiUrl = 'http://localhost:1337/api/queues';

  constructor(private http: HttpClient) {}

  getQueues(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addQueue(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}


