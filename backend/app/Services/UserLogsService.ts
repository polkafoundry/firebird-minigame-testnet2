const HelperUtils = require('@ioc:App/Common/HelperUtils')

import CryptoJS from 'crypto-js'

export default class UserLogsService {
  public UserLogModel = require('@ioc:App/Models/UserLog')
  public async saveLogs(request): Promise<any> {
    const hashText = request.input('log_hash')
    var ip = request.headers['x-forwarded-for'] || null
    console.log('xxx', request)

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

      return HelperUtils.responseSuccess(1)
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }
}
