import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { MatIconModule } from '@angular/material/icon';
import { PromptComponent } from './prompt/prompt.component';
import { ChatbotServiceService } from './chatbot-service.service';
import { HttpClientModule } from '@angular/common/http';
import { IConversationMessage } from '../../interfaces/conversation-message';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule,
    HttpClientModule,
    ConversationComponent,
    PromptComponent,
    MatIconModule],
  standalone: true,
  providers: [ChatbotServiceService],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  public messages: IConversationMessage[] = [];
  chatboxOpen: boolean = true;

  constructor(private chatBotService: ChatbotServiceService) {}

  ngOnInit() {
    this.messages = this.chatBotService.messages;
  }

  toggleChatbox() {
    this.chatboxOpen = !this.chatboxOpen;
  }

  handlePromptChange($event: any) {
    this.messages.push({
      from: 'user',
      text: $event
    });
    this.chatBotService.submitPrompt($event).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: res.choices[0].text.trim()
          })}, 500);
      },
      error: (err) => {
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: err.error?.error?.message
          });
        }, 500);
    }});
  }
}