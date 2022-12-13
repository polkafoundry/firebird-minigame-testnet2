import InvalidParamException from 'App/Exceptions/InvalidParamException'
const Const = require('@ioc:App/Common/Const')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

export default class MatchService {
  public MatchModel = require('@ioc:App/Models/Match')
  public BettingModel = require('@ioc:App/Models/Betting')
  public RecalcBettingModel = require('@ioc:App/Models/RecalcBetting')
  public BetCountModel = require('@ioc:App/Models/BetCount')
  public Database = require('@ioc:Adonis/Lucid/Database')

  public buildQueryService(params) {
    let builder = this.MatchModel.query()
    if ('ids' in params && Array.isArray(params.ids)) {
      builder = builder.whereIn('id', params.ids)
    }
    if ('id' in params) {
      builder = builder.where('id', params.id)
    }
    if ('match_id' in params) {
      builder = builder.where('match_id', params.match_id)
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
    if ('match_status' in params && params.match_status.length) {
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
    //update bet count
    let count = await this.BetCountModel.query()
      .where('match_id', id)
      .where('user_address', wallet_address)
      .first()

    if (count && count?.bet_count < 5) {
      let betCount = await this.Database.from('bettings')
        .count('* as total')
        .where('user_address', wallet_address)
        .where('match_id', id)
      let predictCount = await this.Database.from('predicts')
        .count('*  as total')
        .where('user_address', wallet_address)
        .where('match_id', id)
      let total = betCount[0].total + predictCount[0].total
      await this.BetCountModel.updateOrCreate(
        { user_address: wallet_address, match_id: id },
        { user_address: wallet_address, match_id: id, bet_count: total }
      )
    }

    //get user rank
    const maxValue = await HelperUtils.getLeaderboard(wallet_address)

    const obj = {
      ...match,
      is_completed_bet: match.bet_count ? match.bet_count.bet_count == 5 : false,
      maxPredictValue: maxValue,
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
      .leftOuterJoin('bet_counts', (query) => {
        query
          .on('matchs.match_id', '=', 'bet_counts.match_id')
          .andOnVal('user_address', params.wallet_address || null)
      })

    if (
      'is_completed_bet' in params &&
      params.is_completed_bet.length &&
      'wallet_address' in params
    ) {
      matchesQuery =
        params.is_completed_bet == 'true'
          ? matchesQuery.where('bet_counts.bet_count', 5)
          : matchesQuery.where((builder) =>
              builder.whereNot('bet_counts.bet_count', 5).orWhereNull('bet_counts.bet_count')
            )
    }

    let matches = await matchesQuery
      .select(['matchs.*', 'bet_counts.bet_count as count'])
      .orderBy('matchs.start_time', 'asc')
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
  public async recalcMatch({ matchId }) {
    const [match, recalcBetting] = await Promise.all([
      this.buildQueryService({ match_id: matchId }).first(),
      this.RecalcBettingModel.query()
        .where('match_id', matchId)
        .where('is_executed', false)
        .first(),
    ])
    if (!match) throw new Error('Match not found')
    if (recalcBetting) throw new Error('Re-calc betting is processing...')

    await this.RecalcBettingModel.create({
      match_id: matchId,
    })
  }
}
