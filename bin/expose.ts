import 'dotenv/config'
import localtunnel from "localtunnel"

(async () => {
    const tunnel = await localtunnel({
        subdomain: process.env.LT_SUBDOMAIN,
        port: Number(process.env.FASTIFY_PORT),
    });


    console.log(`${tunnel.url}`);
})()