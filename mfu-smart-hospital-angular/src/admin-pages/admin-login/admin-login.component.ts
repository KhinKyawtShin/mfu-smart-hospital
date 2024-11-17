import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AuthImageComponent, HttpClientModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:1337/api/auth/local'; // Strapi login endpoint for admin

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const loginData = { identifier: this.email, password: this.password };

    this.http.post<{ jwt: string; user: any }>(this.apiUrl, loginData).subscribe({
      next: (response) => {
        // Store JWT token
        localStorage.setItem('jwt', response.jwt);

        // Now fetch the user details to get the role
        this.http.get<any>(`http://localhost:1337/api/users/${response.user.id}?populate=role`).subscribe({
          next: (userDetails) => {
            if (userDetails.role && userDetails.role.name === 'Admin') {
              this.router.navigate(['/admin-view-appointment']); // Navigate to admin dashboard
            } else {
              this.errorMessage = 'You do not have admin access.';
              console.error(userDetails.username + ' does not have admin access. Your role is ' + userDetails.role?.name);
            }
          },
          error: (err) => {
            this.errorMessage = 'Failed to fetch user details.';
            console.error('Error fetching user details:', err);
          }
        });
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}
