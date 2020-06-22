import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Pusher = require('pusher');

@Injectable()
export class BotService {
  private baseURL = process.env.BASE_URL;
  private token = process.env.BOT_TOKEN;

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
      appId: process.env.PUSHER_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
    });
    const response = {
      query: query,
      speech: speech,
    };

    pusher.trigger('bot', 'bot-response', response);
  }
}
