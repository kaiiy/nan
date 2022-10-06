import { WebhookEvent, TextMessage, Client } from '@line/bot-sdk'

export const replyMessage = async (
    client: Client,
    ev: WebhookEvent) => {
    // accept: only text
    if (ev.type !== 'message' || ev.message.type !== 'text') return;

    const replyToken = ev.replyToken;
    // const text = ev.message.text; 

    const response: TextMessage = {
        type: 'text',
        text: 'こんばんは'
    };

    await client.replyMessage(replyToken, response);
}