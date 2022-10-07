import got from 'got';
import { Parsed } from "../src/lib/ginza"
import 'dotenv/config'

(async () => {
    const res = await got.post(
        `http://localhost:${Number(process.env.GINZA_PORT)}`, {
        json: {
            text: '好きな食べ物何?'
        }
    }).json();

    const parsed = res as Parsed

    console.log(parsed);
})()