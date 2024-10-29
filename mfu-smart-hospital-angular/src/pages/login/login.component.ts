import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AuthImageComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Login attempt with email:', this.email, 'and password:', this.password);
    // Add authentication logic here
  }
}
