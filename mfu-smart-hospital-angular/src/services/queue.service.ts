import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private localStorageKey = 'patientData';

  // Set patient data and store it in localStorage
  setPatientData(data: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  // Get patient data from localStorage
  getPatientData() {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  }

  // Clear patient data from localStorage
  clearPatientData() {
    localStorage.removeItem(this.localStorageKey);
  }
}




