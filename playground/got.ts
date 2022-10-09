import got from 'got';
import { GinzaParsed } from "../src/lib/ginza"
import 'dotenv/config'

(async () => {
    const res = await got.post(
        `http://localhost:${Number(process.env.GINZA_PORT)}`, {
        json: {
            text: '好きな食べ物何?'
        }
    }).json();

    const parsed = res as GinzaParsed

    console.log(parsed);
})()