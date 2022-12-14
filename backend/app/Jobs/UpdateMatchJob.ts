import { JobContract } from '@ioc:Rocketseat/Bull'
import Bull from '@ioc:Rocketseat/Bull'

// const MatchModel = require('@ioc:App/Models/Match')

import MatchService from 'App/Services/MatchService'

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

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 2
/* Repeat after this amount of milliseconds */
/* The total number of attempts to try the job until it completes.*/
const attempts = 10

export const updateMatchJob = async (match) => {
  console.log({ match })
  try {
    const jobKey = new UpdateMatchJob().key
    await Bull.getByKey(jobKey).bull.add(jobKey, match, {
      priority: priority,
      removeOnComplete: true,
      removeOnFail: true,
      attempts: attempts,
    })
  } catch (e) {
    console.log('error: ', e.message)
    console.error()
  } finally {
  }
}

export default class UpdateMatchJob implements JobContract {
  public key = 'UpdateMatchJob'

  public async handle(job) {
    try {
      const { data } = job
      // Do somethign with you job data
      console.log({ data })
      const MatchModel = require('@ioc:App/Models/Match')

      const match = await new MatchService().getMatchByIdOrSlug({ id: data.id })
      console.log({ match })
      if (!match) {
        await MatchModel.create(data)
        return
      }

      match.ht_home_score = data.ht_home_score || 0
      match.ft_home_score = data.ft_home_score || 0
      match.ht_away_score = data.ht_away_score || 0
      match.ft_away_score = data.ft_away_score || 0
      match.is_half_time = data.is_half_time || false
      match.is_full_time = data.is_full_time || false
      if (data.match_status) match.match_status = data.match_status

      await match.save()
    } catch (error) {
      console.log('error UpdateMatchJob: ', error.message)
    }
  }
}
