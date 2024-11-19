import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent} from '../pages/register/register.component';
import { PatientQueueComponent } from '../pages/patient-queue/patient-queue.component';
import { AdminLoginComponent } from '../admin-pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from '../admin-pages/admin-register/admin-register.component';
import { CentersComponent } from '../pages/centers/centers.component';
import { AdminViewAppointmentComponent } from '../admin-pages/admin-view-appointment/admin-view-appointment.component';
import { AdminHeaderComponent } from '../admin-pages/admin-header/admin-header.component';
import { AdminCentersComponent } from '../admin-pages/admin-centers/admin-centers.component';
import { VisitTimeComponent } from '../pages/visit-time/visit-time.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { DoctorComponent } from '../pages/doctor/doctor.component';
import { ConfirmAppointmentComponent } from '../pages/confirm-appointment/confirm-appointment.component';
import { VisitTimeChenComponent } from '../pages/visit-time-chen/visit-time-chen.component';
import { AdminDoctorComponent } from '../admin-pages/admin-doctor/admin-doctor.component';
import { ViewAllAppointmentsComponent } from '../pages/view-all-appointments/view-all-appointments.component';
import { BlogComponent } from '../pages/blog/blog.component';
import { ChatbotComponent } from '../pages/chatbot/chatbot.component';
//import { HomeComponent } from '../pages/';
//import { Service } from '../pages/';
//import { PatientRecord } from '../pages/';
//import { History } from '../pages/';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'admin-login', component: AdminLoginComponent},
    { path: 'admin-register', component: AdminRegisterComponent},
    { path: 'centers', component: CentersComponent },
    { path: 'admin-centers', component: AdminCentersComponent },
    { path: 'patient-queue', component: PatientQueueComponent },
    { path: 'admin-view-appointment', component: AdminViewAppointmentComponent},
    { path: 'admin-header', component: AdminHeaderComponent},
    { path: 'visit-time', component: VisitTimeComponent},
    { path: 'home-page', component: HomePageComponent},
    { path: 'doctor', component: DoctorComponent},
    { path: 'admin-doctor', component: AdminDoctorComponent},
    { path: 'confirm-appointment', component: ConfirmAppointmentComponent},
    { path: 'visit-time-chen', component: VisitTimeChenComponent},
    { path: 'view-all-appointments', component: ViewAllAppointmentsComponent},
    { path: 'blog-page', component: BlogComponent},
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    { path: 'visit-time-chen', component: VisitTimeChenComponent},
    { path: 'chatbot', component: ChatbotComponent}
];

