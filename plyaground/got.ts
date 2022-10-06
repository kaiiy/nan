import got from 'got';
import { Parsed } from "../src/lib/ginza"

(async () => {
    const res = await got.post('http://localhost:8080', {
        json: {
            text: '好きな食べ物何?'
        }
    }).json();

    const parsed = res as Parsed

    console.log(parsed);
})()