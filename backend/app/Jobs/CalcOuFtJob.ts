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
import MatchModel from 'App/Models/Match'
import { calcBettingJob } from 'App/Jobs/CalcBettingJob'
const Const = require('@ioc:App/Common/Const')

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 2
/* Repeat after this amount of milliseconds */
const repeatEvery = 0.2 * 60 * 1000 // 1m
/* The total number of attempts to try the job until it completes.*/
const attempts = 1

export const calcOuFtJob = async () => {
  try {
    const jobKey = new CalcOuFtJob().key
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

export default class CalcOuFtJob implements JobContract {
  public key = 'CalcOuFtJob'

  public async handle() {
    try {
      // const { data } = job
      // Do somethign with you job data
      const match = await MatchModel.query()
        .where('is_calculated_ou_ft', false)
        .where('is_full_time', true)
        .first()
      if (!match) return
      console.log('CalcOuFtJob: ', match)
      calcBettingJob({ matchId: match.match_id, betType: Const.BET_TYPE.OU_FT })
    } catch (error) {
      console.log('error CalcOuFtJob: ', error.message)
      throw new Error(error.message)
    }
  }
}
