import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [UserService],
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName : string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve the username from UserService
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      console.log('Logged in as:', currentUser.username);
      this.userName = currentUser.username;
    } else {
      console.warn('No user is logged in.');
      this.userName = 'null';
    }
}

  currentLanguage: string = 'EN';
  isDropdownOpen: boolean = false;

  switchLanguage(language: string) {
    this.currentLanguage = language;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
