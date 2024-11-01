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

  private apiUrl = 'http://localhost:1337/api/auth/local/register'; // Admin registration endpoint
  private assignRoleUrl = 'http://localhost:1337/api/users'; // Adjust this based on your API to assign roles

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
      // Do not include role here if Strapi does not accept it
    };

    this.http.post<{ user: any }>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response.user);
        this.successMessage = 'Admin registration successful! You can now log in.';

        // Now assign the Admin role
        const userId = response.user.id; // Get the user ID from the response
        this.assignRole(userId, 'Admin'); // Call the method to assign the Admin role
      },
      error: (err) => {
        console.error('Admin registration failed:', err);
        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }

  private assignRole(userId: number, roleName: string): void {
    const roleData = { role: roleName }; // Adjust the payload based on your Strapi setup

    this.http.put(`${this.assignRoleUrl}/${userId}`, roleData).subscribe({
      next: () => {
        alert(this.successMessage); // Notify the user of successful registration
        this.router.navigate(['/admin-login']); // Redirect to login page on success
      },
      error: (err) => {
        console.error('Role assignment failed:', err);
        this.errorMessage = 'Failed to assign role. Please try again.';
      }
    });
  }
}
