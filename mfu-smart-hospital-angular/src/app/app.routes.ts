import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { PatientQueueComponent } from '../pages/patient-queue/patient-queue.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'patientqueue', component: PatientQueueComponent },
];
