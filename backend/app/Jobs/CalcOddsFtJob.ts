import { JobContract } from '@ioc:Rocketseat/Bull'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/
import Bull from '@ioc:Rocketseat/Bull'
import BettingModel from 'App/Models/Betting'
import { calcBettingJob } from 'App/Jobs/CalcBettingJob'
const Const = require('@ioc:App/Common/Const')

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 2
/* Repeat after this amount of milliseconds */
const repeatEvery = 0.2 * 60 * 1000 // 1m
/* The total number of attempts to try the job until it completes.*/
const attempts = 1

export const calcOddsFtJob = async () => {
  try {
    const jobKey = new CalcOddsFtJob().key
    let options: any = {
      priority: priority,
      removeOnComplete: true,
      removeOnFail: true,
      repeat: {
        every: repeatEvery, // 1 minutes
        immediately: true,
      },
      attempts: attempts,
    }
    await Bull.getByKey(jobKey).bull.add(jobKey, {}, options)
  } catch (e) {
    console.log('error: ', e.message)
    console.error()
  } finally {
  }
}

export default class CalcOddsFtJob implements JobContract {
  public key = 'CalcOddsFtJob'

  public async handle() {
    try {
      // Do somethign with you job data
      const betting = await BettingModel.query()
        .leftOuterJoin('matchs', builder => {
          builder.on('bettings.match_id', 'matchs.match_id')
        })
        .where('matchs.is_full_time', true)
        .where('bettings.bet_type', Const.BET_TYPE.ODDS_FT)
        .where('bettings.is_calculated', false)
        .first()
      if (!betting) return
      console.log('CalcOddsFtJob: ', betting.match_id)
      calcBettingJob({ matchId: betting.match_id, betType: Const.BET_TYPE.ODDS_FT })
    } catch (error) {
      console.log('error CalcOddsFtJob: ', error.message)
      throw new Error(error.message)
    }
  }
}
