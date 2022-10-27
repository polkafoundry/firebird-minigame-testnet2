import { JobContract } from '@ioc:Rocketseat/Bull'
import MatchService from 'App/Services/MatchService'
import MatchApiService from 'App/Services/MatchApiService'
import { updateMatchJob } from 'App/Jobs/UpdateMatchJob'

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

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 1
/* Repeat after this amount of milliseconds */
const repeatEvery = 5 * 60 * 1000 // 5m
/* The total number of attempts to try the job until it completes.*/
const attempts = 1

export const fetchLiveMatchJob = async () => {
  try {
    const jobKey = new FetchLiveMatchJob().key
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

export default class FetchLiveMatchJob implements JobContract {
  public key = 'FetchLiveMatchJob'

  public async handle(job) {
    // Do somethign with you job data
    const liveMatches = await (new MatchService()).getLiveMatch()
    console.log(liveMatches)
    await Promise.all(liveMatches.map(match => this._updateLiveMatch(match)))
  }
  private async _updateLiveMatch(match) {
    const matchData: any = await (new MatchApiService()).getData({ url: `https://api.sofascore.com/api/v1/event/${match.match_id}` })

    return updateMatchJob({
      id: match.id,
      status: matchData.event?.status?.code,
      status_type: matchData.event?.status?.type,
      winner: matchData.event?.winnerCode,
      result: JSON.stringify({
        home_score: matchData.event?.homeScore,
        away_score: matchData.event?.awayScore,
        injury: matchData.event?.injury,
        time: matchData.event?.time
      }),
    })
  }
}
