import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component'; 
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-centers',
  standalone: true,
  imports: [AdminHeaderComponent, CardComponent, CommonModule],
  templateUrl: './admin-centers.component.html',
  styleUrl: './admin-centers.component.css'
})
export class AdminCentersComponent {
  centers = [
    { name: 'Heart', imageUrl: 'assets/heart.png' },
    { name: 'Cancer', imageUrl: 'assets/cancer.png' },
    { name: 'Bone', imageUrl: 'assets/bone.png' },
    { name: 'Brain', imageUrl: 'assets/brain.png' },
    { name: 'Dental', imageUrl: 'assets/dental.png' },
    { name: 'Eye', imageUrl: 'assets/eye.png' },
    { name: 'Child', imageUrl: 'assets/child.png' },
    { name: 'Aesthetic', imageUrl: 'assets/aesthetic.png' },
  ];

  selectedCenter: string | null = null;

  chooseCenter(centerName: string) {
    this.selectedCenter = centerName;
  }
}
