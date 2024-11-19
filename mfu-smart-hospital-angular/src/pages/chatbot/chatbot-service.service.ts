import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConversationMessage } from '../../interfaces/conversation-message';

const apiUrl: string = 'https://api.openai.com/v1/completions';
const apiKey: string = 'api_key';

@Injectable({
  providedIn: 'root'
})
export class ChatbotServiceService {
    public messages: IConversationMessage[] =     [{
        text: "Hello Assistant AI",
        from: "user"
      },
      {
        text: "Hello User, I am your Assistant AI",
        from: "bot"
      }];

  constructor(private http: HttpClient) {}

  submitPrompt(userInput: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${apiKey}`);

    return this.http.post<any>(
        apiUrl,
      {
        model: 'gpt-3.5-turbo',
        prompt: userInput,
        max_tokens: 150,
        temperature: 0.7,
        stop: ['\n']
      },
      { headers }
    );
  }
}
