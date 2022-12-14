import GiftCodeService from '@ioc:Firebird/GiftCodeService'

export default class GiftCodeController {
  public async createCode({ request }) {
    return await GiftCodeService.createCode(request)
  }

  public async getCodeAvaiable({ request }) {
    return await GiftCodeService.getCodeAvaiable(request)
  }

  public async useCode({ request }) {
    return await GiftCodeService.useCode(request)
  }

  public async checkCodeInfo({ request }) {
    return await GiftCodeService.checkCodeInfo(request)
  }

  public async getActiveCode({ request }) {
    return await GiftCodeService.getActiveCode(request)
  }
}
