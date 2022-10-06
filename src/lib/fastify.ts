import { WebhookRequestBody } from '@line/bot-sdk'
import { FastifyInstance } from 'fastify'

export type IBody = {
    parsed: WebhookRequestBody,
    raw: string
}
export type IHeaders = {
    "x-line-signature": string
}

export const createFastify = (fastify: FastifyInstance) => {
    fastify.addContentTypeParser('application/json', { parseAs: 'string' },
        (_, body, done) => {
            try {
                const newBody = {
                    raw: body,
                    parsed: JSON.parse(String(body)),
                };
                done(null, newBody);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(err);
                }
            }
        });

    return fastify
}