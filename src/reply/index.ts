import { WebhookEvent, TextMessage, Client } from '@line/bot-sdk'
import got from 'got';
import { GinzaParsed } from "../lib/ginza"
import { mafuyuQA } from "../messages/mafuyu"

const PORT = {
    GINZA: 45100,
    PYMAGNITUDE: 45200
} as const

type SimList = {
    id: number,
    sent: string[]
}

type TargetSim = {
    id: number,
    sim: number
}

type TargetSims = TargetSim[]

export const replyMessage = async (
    client: Client,
    ev: WebhookEvent) => {
    // accept: only text
    if (ev.type !== 'message' || ev.message.type !== 'text') return;

    const userText = ev.message.text;
    console.log(userText)

    if (userText === "野原しんのすけ") {
        await client.replyMessage(ev.replyToken, {
            type: "text",
            text: "Clear!"
        });
    }

    const userParsed = await got.post(
        `http://localhost:${PORT.GINZA}`, {
        headers: {
            'Content-Type': "application/json",
        },
        json: {
            text: userText
        }
    }).json() as GinzaParsed;
    const userParsedWords = userParsed.tokens.map((token) => token.lemma);

    const serverParsedWordsList: SimList[] = []
    for (let i = 0; i < mafuyuQA.length; i++) {
        const res = await got.post(
            `http://localhost:${PORT.GINZA}`, {
            headers: {
                'Content-Type': "application/json",
            },
            json: {
                text: mafuyuQA[i].question,
            }
        }).json() as GinzaParsed;

        serverParsedWordsList.push({
            id: i,
            sent: res.tokens.map((token) => token.lemma)
        })
    }

    const targetSims = await got.post(
        `http://localhost:${PORT.PYMAGNITUDE}/targets`, {
        headers: {
            'Content-Type': "application/json",
        },
        json: {
            base: userParsedWords,
            targets: serverParsedWordsList
        }
    }).json() as TargetSims
    const targetSimsArr = targetSims.map((ts) => ts.sim)

    const simMin = Math.min(...targetSimsArr)
    const simMinAnswer = mafuyuQA.map((qa) => qa.answer)[targetSimsArr.indexOf(simMin)]
    const response: TextMessage[] = [
        {
            type: 'text',
            text: simMinAnswer
        },
        {
            type: 'text',
            text: String(Math.round((1 - simMin) * 100) / 100)
        }
    ];

    await client.replyMessage(ev.replyToken, response);
}