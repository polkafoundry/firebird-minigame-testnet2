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
    public async getLeaderboard({ wallet_address, startTime, endTime, limit, offset, search }) {
        const arrPrize = Object.keys(Const.PRIZE).map(item => +item).sort(function (a, b) { return a - b });
        const currentTime = new Date()
        const token = HelperUtils.getMFToken(`${currentTime.getTime()}${Const.MF_KEY.TENANT_ID}${Const.MF_KEY.SECRET_KEY}`)
        const res = await axios.get(`${Const.MF_ENDPOINT}/firebird/query/${Const.MF_KEY.TENANT_ID}/dashboard/${currentTime.getTime()}?startTime=${startTime}&endTime=${endTime}&event=${Const.MF_KEY.EVENT_NAME}&tenantId=${Const.MF_KEY.TENANT_ID}&sumBy=earned&limit=${limit}&offset=${offset}&search=${search}` + (wallet_address ? `&currentUserId=${wallet_address}` : ''), {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return {
            ...res.data,
            data: res.data.data.map(item => {
                const top = arrPrize.find(x => x >= item.position)
                return {
                    ...item,
                    prize: top ? Const.PRIZE[top] : 0
                }
            })
        }
    }
}
