// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const HelperUtils = require('@ioc:App/Common/HelperUtils')
import PredictWinnerModel from "App/Models/PredictWinner"
import BettingModel from "App/Models/Betting"
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminsController {
    public async getDashboardData({ request }) {
        try {
            const params = request.only(['startTime', 'endTime'])

            const buildQuery = (model, fieldName = 'dispatch_at') => {
                if ('startTime' in params && 'endTime' in params) {
                    const startTime = fieldName == 'dispatch_at' ? params.startTime : new Date(+`${params.startTime}000`)
                    const endTime = fieldName == 'dispatch_at' ? params.endTime : new Date(+`${params.endTime}999`)
                    model = model.where(fieldName, '>=', startTime).where(fieldName, '<=', endTime)
                }
                return model
            }

            const [bettingUser, predictUser, bettingTx, predictTx, claimTx, predictWinner] = await Promise.all([
                buildQuery(Database.from('bettings')).countDistinct({ count: 'user_address' }),
                buildQuery(Database.from('predicts')).countDistinct({ count: 'user_address' }),
                buildQuery(Database.from('bettings')).count({ count: '*' }),
                buildQuery(Database.from('predicts')).count({ count: '*' }),
                buildQuery(Database.from('bettings'), 'updated_at').where('has_claim', true).count({ count: '*' }),
                PredictWinnerModel.query().preload('match').exec()
            ])
            return HelperUtils.responseSuccess({
                betting_user: bettingUser[0]?.count || 0,
                predict_user: predictUser[0]?.count || 0,
                betting_tx: bettingTx[0]?.count || 0,
                predict_tx: predictTx[0]?.count || 0,
                claim_tx: claimTx[0]?.count || 0,
                predict_winner: predictWinner
            })
        } catch (error) {
            return HelperUtils.responseErrorInternal(error.message)
        }
    }
}
