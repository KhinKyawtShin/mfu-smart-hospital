import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthImageComponent } from '../../components/auth-image/auth-image.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AuthImageComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Register attempt with email:', this.username, this.email, 'and password:', this.password);
    // Add authentication logic here
  }
}
