const HelperUtils = require('@ioc:App/Common/HelperUtils')

import CryptoJS from 'crypto-js'

export default class UserLogsService {
  public UserLogModel = require('@ioc:App/Models/UserLog')
  public BetCountModel = require('@ioc:App/Models/BetCount')
  public PredictModel = require('@ioc:App/Models/Predict')

  public Database = require('@ioc:Adonis/Lucid/Database')
  public async saveLogs(request): Promise<any> {
    const hashText = request.input('log_hash')

    if (!hashText) return HelperUtils.responseErrorInternal('Log hash required')

    try {
      var bytes = CryptoJS.AES.decrypt(hashText, process.env.HASH_KEY)
      var originalText = bytes.toString(CryptoJS.enc.Utf8)

      let data = JSON.parse(originalText)
      let userLogs = new this.UserLogModel()
      userLogs.status = data?.status
      userLogs.type = data?.type
      userLogs.user_address = data?.user_address
      userLogs.match_id = data?.match_id
      userLogs.bet_type = data?.bet_type
      userLogs.home_score = data?.home_score
      userLogs.away_score = data?.away_score
      userLogs.amount = data?.amount
      userLogs.ping_time = data?.time
      userLogs.error_text = data?.errorText
      userLogs.ip_address = request?.ip()
      await userLogs.save()

      if (data?.status === 'success' && data?.type === 'bet') {
        let bets = await this.BetCountModel.query()
          .where('match_id', data?.user_address)
          .andWhere('user_address', data?.match_id)
          .first()
        if (!bets) {
          let betCountData = new this.BetCountModel()
          betCountData.match_id = data?.match_id
          betCountData.user_address = data?.user_address
          betCountData.bet_count = 1
          await betCountData.save()
        } else {
          await this.BetCountModel.query()
            .where('match_id', data?.match_id)
            .andWhere('user_address', data?.user_address)
            .update({
              bet_count: bets.bet_count + 1,
            })
        }
      }

      if (data?.status === 'success' && data?.type === 'predict') {
        const userPredict = await this.PredictModel.query()
          .where('match_id', data?.user_address)
          .andWhere('user_address', data?.match_id)
          .first()
        if (!userPredict) {
          let bets = await this.BetCountModel.query()
            .where('match_id', data?.user_address)
            .andWhere('user_address', data?.match_id)
            .first()
          if (!bets) {
            let betCountData = new this.BetCountModel()
            betCountData.match_id = data?.match_id
            betCountData.user_address = data?.user_address
            betCountData.bet_count = 1
            await betCountData.save()
          } else {
            await this.BetCountModel.query()
              .where('match_id', data?.match_id)
              .andWhere('user_address', data?.user_address)
              .update({
                bet_count: bets.bet_count + 1,
              })
          }
        }
      }

      return HelperUtils.responseSuccess(1)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
}
