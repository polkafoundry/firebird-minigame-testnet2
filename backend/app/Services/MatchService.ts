import InvalidParamException from 'App/Exceptions/InvalidParamException'

export default class MatchService {
  public MatchModel = require('@ioc:App/Models/Match')

  public buildQueryService(params) {
    let builder = this.MatchModel.query()
    if ('ids' in params && Array.isArray(params.ids)) {
      builder = builder.whereIn('id', params.ids)
    }
    if ('id' in params) {
      builder = builder.where('id', params.id)
    }
    if ('is_create_match_contract' in params) {
      builder = builder.where('is_create_match_contract', params.is_create_match_contract)
    }
    if ('is_create_match_contract' in params) {
      builder = builder.where('is_create_match_contract', params.is_create_match_contract)
    }
    if ('create_match_status' in params) {
      builder = builder.where('create_match_status', params.create_match_status)
    }
    if ('is_half_time' in params) {
      builder = builder.where('is_half_time', params.is_half_time)
    }
    if ('is_full_time' in params) {
      builder = builder.where('is_full_time', params.is_full_time)
    }
    return builder
  }
  public async getLiveMatch() {
    const currentTime = Math.floor(Date.now() / 1000)
    const liveMatches = await this.MatchModel.query()
      .where('is_full_time', false)
      .where('start_time', '<=', currentTime)
    return Promise.resolve(JSON.parse(JSON.stringify(liveMatches)))
  }
  public async getMatchByIdOrSlug(params) {
    return this.buildQueryService(params)
      // .orWhere((builder) => {
      //   builder.where('custom_id', params.custom_id || '').where('match_id', params.match_id || '')
      // })
      // .orWhere((builder) => {
      //   builder.where('round', params.round || '').where('slug', params.slug || '')
      // })
      .first()
  }
  public async findByMatchId({ id, wallet_address }): Promise<any> {
    return this.buildQueryService({ id })
      .preload('bettings', query => {
        query.where('user_address', wallet_address || null)
      })
      .first()
  }

  public async getListMatch(request): Promise<any> {
    const page = request.input('page') || 1
    const size = request.input('size') || 10

    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    let matchs = await this.buildQueryService({}).preload('bettings', query => {
      query.where('user_address', request.input('wallet_address') || null)
    }).paginate(page, size)
    return matchs
  }
  public async getUpcomingMatch(request) {
    const page = request.input('page') || 1
    const size = request.input('size') || 10
    const currentTime = Math.floor(Date.now() / 1000)
    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    const matches = await this.buildQueryService({ is_half_time: false, is_full_time: false })
      .where('start_time', '>=', currentTime)
      .preload('bettings', query => {
        query.where('user_address', request.input('wallet_address') || null)
      })
      .orderBy('start_time', 'ASC').paginate(page, size)

    return matches
  }
}
