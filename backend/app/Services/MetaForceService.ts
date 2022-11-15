import axios from 'axios'
const Const = require('@ioc:App/Common/Const')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

export default class MetaForceService {
    public async removeData({ startTime, endTime }) {
        console.log('remove data: ', { startTime, endTime })
        const currentTime = new Date().getTime()
        const token = HelperUtils.getMFToken(`${currentTime}${Const.MF_KEY.TENANT_ID}${Const.MF_KEY.SECRET_KEY}`)
        const res = await axios.delete(`${Const.MF_ENDPOINT}/firebird/delete/${Const.MF_KEY.TENANT_ID}/${currentTime}`, {
            params: {
                event: Const.MF_KEY.EVENT_NAME,
                startTime,
                endTime,
            },
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        console.log({ res })
    }
}
