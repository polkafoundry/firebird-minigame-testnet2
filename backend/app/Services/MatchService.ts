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
    if ('status' in params) {
      builder = builder.where('status', params.status)
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
    return (
      this.buildQueryService(params)
        // .orWhere((builder) => {
        //   builder.where('custom_id', params.custom_id || '').where('match_id', params.match_id || '')
        // })
        // .orWhere((builder) => {
        //   builder.where('round', params.round || '').where('slug', params.slug || '')
        // })
        .first()
    )
  }
  public async findByMatchId(request): Promise<any> {
    return request.params()
  }

  public async getListMatch(request): Promise<any> {
    const page = request.input('page') || 1
    const size = request.input('size') || 10

    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    // const MatchModel = require('@ioc:App/Models/Match')
    // let query = MatchModel.query()
    // let listMatch = await query.where('box_id', boxId).where('is_opened', 0).first()
    const Database = require('@ioc:Adonis/Lucid/Database')
    const matchs = await Database.from('matches').paginate(page, size)

    return matchs
  }
  public async getUpcomingMatch(request) {
    const page = request.input('page') || 1
    const size = request.input('size') || 10

    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    const matches = await this.buildQueryService({ status: 0 })
      .orderBy('start_time', 'ASC')
      .paginate(page, size)

    return matches
  }
}
