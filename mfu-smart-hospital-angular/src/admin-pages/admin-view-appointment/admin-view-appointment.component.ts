import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';


@Component({
  selector: 'app-admin-view-appointment',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './admin-view-appointment.component.html',
  styleUrl: './admin-view-appointment.component.css'
})
export class AdminViewAppointmentComponent {


search(): void{
//write later
  }


editAppointment(): void{

}
}


