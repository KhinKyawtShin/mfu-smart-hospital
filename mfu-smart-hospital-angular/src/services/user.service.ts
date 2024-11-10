import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  // Add other necessary fields here
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.loadUser());
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Store user data upon login
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Retrieve current user data
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // Clear user data upon logout
  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // Load user from localStorage
  private loadUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
