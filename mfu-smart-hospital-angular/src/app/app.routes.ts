import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent} from '../pages/register/register.component';
import { PatientQueueComponent } from '../pages/patient-queue/patient-queue.component';
import { AdminLoginComponent } from '../admin-pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from '../admin-pages/admin-register/admin-register.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'admin-login', component: AdminLoginComponent},
    { path: 'admin-register', component: AdminRegisterComponent},
    { path: 'patientqueue', component: PatientQueueComponent },
];
