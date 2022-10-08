"use strict";
import "dotenv/config";
import Fastify from "fastify";
import { validateSignature, Client } from "@line/bot-sdk";
import { createFastify } from "./lib/fastify";
import { createConfig } from "./lib/line";
import { replyMessage } from "./reply";
const fastify = createFastify(
  Fastify({
    logger: true
  })
);
const [clientConfig, middlewareConfig] = createConfig(process.env.CHANNEL_ACCESS_TOKEN, process.env.CHANNEL_SECRET);
const client = new Client(clientConfig);
fastify.get("/", async (_, reply) => {
  reply.type("application/json").code(200);
  return { hello: "world!" };
});
fastify.post("/", async (request, reply) => {
  const body = request.body.parsed;
  const events = body.events;
  const verified = validateSignature(
    request.body.raw,
    middlewareConfig.channelSecret,
    request.headers["x-line-signature"]
  );
  if (!verified) {
    reply.code(403);
    return;
  }
  await Promise.all(
    events.map(async (event) => {
      try {
        await replyMessage(client, event);
      } catch (err) {
        if (err instanceof Error)
          console.error(err);
      }
    })
  );
  reply.type("application/json").code(200);
});
fastify.listen({ port: Number(process.env.FASTIFY_PORT) }, (err, _) => {
  if (err)
    throw err;
});
