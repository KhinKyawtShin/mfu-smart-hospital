import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { PatientQueueComponent } from '../pages/patient-queue/patient-queue.component';
//import { HomeComponent } from '../pages/';
//import { Service } from '../pages/';
//import { PatientRecord } from '../pages/';
//import { History } from '../pages/';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'patientqueue', component: PatientQueueComponent },
];
