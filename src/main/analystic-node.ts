import { app } from 'electron'
import { ofetch } from 'ofetch'
import * as store from './store-node'

// https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?hl=zh-cn&client_type=gtag
// https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag&hl=zh-cn#required_parameters

const measurementId = `G-T6Q7MNPNLK`
const apiSecret = `pRnsvLo-REWLVzV_PbKvWg`

export  async function event(name: string, params: any = {}) {
    const clientId = store.getConfig().uuid
    const res = await ofetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
        {
            method: 'POST',
            body: {
                user_id: clientId,
                client_id: clientId,
                events: [
                    {
                        name,
                        params: {
                            app_name: 'chatbox',
                            app_version: app.getVersion(),
                            chatbox_platform_type: 'desktop',
                            chatbox_platform: 'desktop',
                            app_platform: process.platform,
                            ...params,
                        },
                    },
                ],
            },
        }
    )
    return res
}
