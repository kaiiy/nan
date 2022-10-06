import { ClientConfig, MiddlewareConfig } from '@line/bot-sdk'

export const createConfig = (
    token: string | undefined,
    secret: string | undefined): [ClientConfig, MiddlewareConfig] => {

    if (!token || !secret) throw Error()

    const clientConfig: ClientConfig = {
        channelAccessToken: token
    }
    const middlewareConfig: MiddlewareConfig = {
        channelSecret: secret
    }

    return [clientConfig, middlewareConfig]
}