import InvalidParamException from 'App/Exceptions/InvalidParamException'
const Const = require('@ioc:App/Common/Const')

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
    if ('round_name' in params) {
      builder = builder.where('round_name', params.round_name)
    }
    if ('match_status' in params) {
      builder = builder.where('match_status', params.match_status)
    }

    return builder
  }
  public async getLiveMatch() {
    const currentTime = Math.floor(Date.now() / 1000)
    const liveMatches = await this.MatchModel.query()
      .where('match_status', Const.MATCH_STATUS.LIVE)
      .orWhere((builder) => {
        builder.where('is_full_time', false).where('start_time', '<=', currentTime)
      })
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
  public async findByMatchId({ id, wallet_address }): Promise<any> {
    let match = await this.buildQueryService({ id })
      .preload('bettings', (query) => {
        query.where('user_address', wallet_address || null)
      })
      .preload('predicts', (query) => {
        query.where('user_address', wallet_address || null)
      })
      .preload('bet_count', (query) => {
        query.where('user_address', wallet_address || null)
      })
      .first()
    match = JSON.parse(JSON.stringify(match))
    const obj = {
      ...match,
      is_completed_bet: match.bet_count ? match.bet_count.bet_count == 5 : false,
    }
    delete match.bet_count
    return obj
  }

  public async getListMatch(request): Promise<any> {
    const page = request.input('page') || 1
    const size = request.input('size') || 10

    const params = request.all()

    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    let matchesQuery = this.buildQueryService(params)
      .preload('bettings', (query) => {
        query.where('user_address', params.wallet_address || null)
      })
      .preload('predicts', (query) => {
        query.where('user_address', params.wallet_address || null)
      })
      .leftOuterJoin('bet_counts', query => {
        query.on('matchs.match_id', '=', 'bet_counts.match_id')
          .andOnVal('user_address', params.wallet_address || null)
      })

    if ('is_completed_bet' in params && 'wallet_address' in params) {
      matchesQuery = params.is_completed_bet == 'true' ? matchesQuery.where('bet_counts.bet_count', 5) : matchesQuery.where('bet_counts.bet_count', '<>', 5)
    }

    let matches = await matchesQuery
      .select(['matchs.*', 'bet_counts.bet_count as count'])
      .paginate(page, size)
    matches = JSON.parse(JSON.stringify(matches))
    return {
      ...matches,
      data: matches.data.map((match) => {
        let obj = {
          ...match,
          is_completed_bet: match.count ? match.count == 5 : false,
        }
        delete obj.bettings
        delete obj.predicts
        return obj
      }),
    }
  }
  public async getUpcomingMatch(request) {
    const page = request.input('page') || 1
    const size = request.input('size') || 10
    const currentTime = Math.floor(Date.now() / 1000)
    if (isNaN(page) || isNaN(size) || parseInt(page) <= 0 || parseInt(size) <= 0)
      throw new InvalidParamException('page or size must be specified as positive number')
    let matches = await this.buildQueryService({ is_half_time: false, is_full_time: false })
      .where('start_time', '>=', currentTime)
      .preload('bettings', (query) => {
        query.where('user_address', request.input('wallet_address') || null)
      })
      .preload('predicts', (query) => {
        query.where('user_address', request.input('wallet_address') || null)
      })
      .preload('bet_count', (query) => {
        query.where('user_address', request.input('wallet_address') || null)
      })
      .orderBy('start_time', 'ASC')
      .paginate(page, size)

    matches = JSON.parse(JSON.stringify(matches))
    return {
      ...matches,
      data: matches.data.map((match) => {
        let obj = {
          ...match,
          is_completed_bet: match.bet_count ? match.bet_count.bet_count == 5 : false,
        }
        delete obj.bettings
        delete obj.predicts
        return obj
      }),
    }
  }
}
