import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardComponent, CommonModule],
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent {
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
