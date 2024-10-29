import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-auth-image',
  templateUrl: './auth-image.component.html',
  styleUrls: ['./auth-image.component.css'] // Optional: Create this file for custom styles
})
export class AuthImageComponent {
  authImage = 'assets/mfu_hospital.png'; // Path to the image
}
