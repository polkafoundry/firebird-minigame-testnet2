// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
const HelperUtils = require('@ioc:App/Common/HelperUtils')
const Const = require('@ioc:App/Common/Const')

export default class MetaForcesController {
    public async getData({ request }) {
        try {
            const params = request.all()
            const wallet_address = request.input('wallet_address')
            const currentTime = new Date()
            const token = HelperUtils.getMFToken(`${currentTime.getTime()}${Const.MF_KEY.TENANT_ID}${Const.MF_KEY.SECRET_KEY}`)
            const res = await axios.get(`${Const.MF_ENDPOINT}/firebird/query/dev/dashboard/${currentTime.getTime()}?startTime=${params.startTime}&endTime=${params.endTime}&event=${Const.MF_KEY.EVENT_NAME}&tenantId=${Const.MF_KEY.TENANT_ID}&sumBy=earned&limit=${params.limit}&offset=${params.offset}` + (wallet_address ? `&currentUserId=${wallet_address}` : ''), {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return HelperUtils.responseSuccess(res?.data)
        } catch (error) {
            return HelperUtils.responseErrorInternal(error.message)
        }
    }
}
