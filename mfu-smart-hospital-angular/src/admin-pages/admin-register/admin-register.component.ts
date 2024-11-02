import { Component } from '@angular/core';
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
export class AdminRegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // API URLs
  private apiUrl = 'http://localhost:1337/api/auth/local/register';
  private assignRoleUrl = 'http://localhost:1337/api/users'; // This is for assigning the role

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
      // Remove the role assignment here
    };

    this.http.post<{ user: any }>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response.user);
        this.successMessage = 'Admin registration successful! Assigning Admin role...';

        const userId = response.user.id;
        this.assignRole(userId);
      },
      error: (err) => {
        console.error('Admin registration failed:', err);
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
      }
    });
  }

  private assignRole(userId: number): void {
    const roleData = { role: 3 }; // Role ID for Admin

    this.http.put(`${this.assignRoleUrl}/${userId}`, roleData).subscribe({
      next: () => {
        this.successMessage = 'Admin role assigned successfully!';
        alert(this.successMessage);
        this.router.navigate(['/admin-login']);
      },
      error: (err) => {
        console.error('Role assignment failed:', err);
        this.errorMessage = 'Failed to assign role. Please try again.';
      }
    });
  }
}
