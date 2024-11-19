import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [UserService],
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  isDropdownOpen: boolean = false;

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

    this.loadGoogleTranslateScript();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private loadGoogleTranslateScript(): void {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,th' },
        'google_translate_element'
      );
    };
  }
}
