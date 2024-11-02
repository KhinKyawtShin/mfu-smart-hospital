import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule, AuthImageComponent, HttpClientModule, CommonModule],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  private apiUrl = 'http://localhost:1337/api/auth/local/register';
  private roleUrl = 'http://localhost:1337/users-permissions/roles'; // Endpoint for fetching roles

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Optionally, you can fetch the Admin role ID here if needed
    // but since we're directly assigning roles, we can remove this if it's not necessary
  }

  onSubmit(): void {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http.post<{ user: any }>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response.user);
        this.successMessage = 'Admin registration successful!';

        // Optional: you can fetch roles after registration if needed
        this.router.navigate(['/admin-login']); // Redirect to the login page
      },
      error: (err) => {
        console.error('Admin registration failed:', err);
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
      }
    });
  }
}
