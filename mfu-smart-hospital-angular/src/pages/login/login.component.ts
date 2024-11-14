import { Component, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    UserService // Make UserService available application-wide
  ],
  imports: [FormsModule, AuthImageComponent, HttpClientModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:1337/api/auth/local'; // Strapi login endpoint


  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  onSubmit(): void {
    const loginData = { identifier: this.email, password: this.password };

    this.http.post<{ jwt: string; user: any }>(this.apiUrl, loginData).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.jwt);
        this.userService.setUser(response.user); // Store JWT token
        console.log('User data submitted successfully:', this.userService.getCurrentUser())
        this.router.navigate(['/home-page']);      // Navigate to dashboard on success
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}
