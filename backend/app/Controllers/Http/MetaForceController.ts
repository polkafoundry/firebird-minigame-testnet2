import MetaForceService from 'App/Services/MetaForceService'
const HelperUtils = require('@ioc:App/Common/HelperUtils')

export default class MetaForcesController {
    public async getData({ request }) {
        try {
            const params = request.all()
            const wallet_address = request.input('wallet_address')
            const res = await new MetaForceService().getLeaderboard({ wallet_address, startTime: params.startTime, endTime: params.endTime, limit: params.limit, offset: params.offset, search: params.search || '' })
            return HelperUtils.responseSuccess(res)
        } catch (error) {
            return HelperUtils.responseErrorInternal(error.message)
        }
    }
}
