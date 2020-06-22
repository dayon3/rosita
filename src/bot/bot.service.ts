import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Pusher = require('pusher');

@Injectable()
export class BotService {
  private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token = '2ddb1c13cbee4909b507549d4ca2a413';

  sendDialogue(info: Record<string, string>) {
    const data = {
      query: info.message,
      lang: 'en',
      sessionId: '123456789!@#$%',
    };

    axios
      .post(`${this.baseURL}`, data, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((response) => {
        this.postToPusher(response.data.result.fulfillment.speech, data.query);
      });
  }

  postToPusher(speech: string, query: string) {
    const pusher = new Pusher({
      appId: '1022368',
      key: '6f60a9ccb7a4371164d3',
      secret: 'ff1fc4b63de1c53fb519',
      cluster: 'ap2',
      useTLS: true,
    });
    const response = {
      query: query,
      speech: speech,
    };

    pusher.trigger('bot', 'bot-response', response);
  }
}
