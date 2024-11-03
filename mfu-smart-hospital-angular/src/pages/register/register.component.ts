import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AuthImageComponent, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  private apiUrl = 'http://localhost:1337/api/auth/local/register'; // Strapi registration endpoint

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post<{ user: any }>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful! You can now log in.';
        this.router.navigate(['/login']); // Redirect to login page on success
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = 'It is already taken';
      }
    });
  }
}
