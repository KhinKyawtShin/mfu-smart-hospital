import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule, AuthImageComponent],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Register attempt with email:', this.username, this.email, 'and password:', this.password);
    // Add authentication logic here
  }
}
