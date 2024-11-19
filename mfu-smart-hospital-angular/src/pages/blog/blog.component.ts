import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs = [
    {
      category: 'Health & Wellbeing',
      title: 'What is Human Flourishing?',
      description: `Grace Walsh discusses simple but effective activities and habits that support the right mindsets, thoughts, and behaviours.`,
      imageUrl: 'assets/blog.jpg' // Replace with your image path
    },
    {
      category: 'Health & Wellbeing',
      title: 'What is Human Flourishing?',
      description: `Grace Walsh discusses simple but effective activities and habits that support the right mindsets, thoughts, and behaviours.`,
      imageUrl: 'assets/blog.jpg' // Replace with your image path
    },
    {
      category: 'Health & Wellbeing',
      title: 'What is Human Flourishing?',
      description: `Grace Walsh discusses simple but effective activities and habits that support the right mindsets, thoughts, and behaviours.`,
      imageUrl: 'assets/blog.jpg' // Replace with your image path
    },
    {
      category: 'Health & Wellbeing',
      title: 'What is Human Flourishing?',
      description: `Grace Walsh discusses simple but effective activities and habits that support the right mindsets, thoughts, and behaviours.`,
      imageUrl: 'assets/blog.jpg' // Replace with your image path
    },
  ];
}




