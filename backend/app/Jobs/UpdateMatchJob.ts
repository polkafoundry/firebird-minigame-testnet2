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
const attempts = 5

export const updateMatchJob = async (match) => {
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
      const MatchModel = require('@ioc:App/Models/Match')

      let options = { id: data.id, custom_id: data.custom_id, match_id: data.match_id, round: data.round, slug: data.slug }
      Object.keys(options).forEach(item => {
        if (!options[item]) delete options[item]
      })
      console.log({ options })
      const match = await new MatchService().getMatchByIdOrSlug(options)
      console.log({ match })
      if (!match) {
        await MatchModel.create(data)
        return
      }

      match.status = data.status
      match.status_type = data.status_type
      match.winner = data.winner
      match.result = data.result
      await match.save()
    } catch (error) {
      console.log('error UpdateMatchJob: ', error.message)
    }
  }
}
