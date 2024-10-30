import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, AuthImageComponent],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Login attempt with email:', this.email, 'and password:', this.password);
    // Add authentication logic here
  }
}
