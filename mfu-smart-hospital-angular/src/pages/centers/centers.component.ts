import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.css'
})
export class CentersComponent {

}
