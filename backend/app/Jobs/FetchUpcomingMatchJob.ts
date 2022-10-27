import { JobContract } from '@ioc:Rocketseat/Bull'
import axios from 'axios'
import { updateMatchJob } from './UpdateMatchJob'
import MatchApiService from 'App/Services/MatchApiService'

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
const repeatEvery = 12 * 60 * 60 * 1000 // 12 hour
/* The total number of attempts to try the job until it completes.*/
const attempts = 10

export const fetchUpcomingMatchJob = async ({ seed = false, repeat = true }) => {
  try {
    console.log({ seed, repeat })
    const jobKey = new FetchUpcomingMatchJob().key
    let options: any = {
      priority: priority,
      removeOnComplete: true,
      removeOnFail: true,
    }
    if (repeat) {
      options = {
        ...options,
        repeat: {
          every: repeatEvery, // 1 minutes
          immediately: true,
        },
        attempts: attempts,
      }
    }
    await Bull.getByKey(jobKey).bull.add(jobKey, { seed }, options)
  } catch (e) {
    console.log('error: ', e.message)
    console.error()
  } finally {
  }
}

export default class FetchUpcomingMatchJob implements JobContract {
  public key = 'FetchUpcomingMatchJob'

  public async handle(job) {
    const { data } = job
    console.log(data)
    // Do somethign with you job data
    const matches = await this._getMatches(data.seed)
    // console.log({ matches })
    console.log(matches.length)
    matches.map(match => updateMatchJob(match))
  }
  private async _getMatches(seed: any) {
    try {
      let data = []
      const url = process.env.NODE_ENV == 'production' ? 'https://api.sofascore.com/api/v1/unique-tournament/16/season/41087/events/next/' : 'https://api.sofascore.com/api/v1/unique-tournament/17/season/41886/events/next/'
      let page = 0
      const matchApiService = new MatchApiService()
      while (true) {
        console.log({ page })
        const res: any = await matchApiService.getData({ url: `${url}${page++}` })
        console.log(res.events)
        console.log(res.events.length)
        console.log(res.events[0])
        data = data.concat(res.events.map(event => {
          return {
            tournament: event.tournament?.slug,
            home_team_name: event.homeTeam.name,
            home_team_slug: event.homeTeam.slug,
            away_team_name: event.awayTeam.name,
            away_team_slug: event.awayTeam.slug,
            status: event.status?.code,
            status_type: event.status?.type,
            winner: event.winnerCode,
            round: event.roundInfo.round,
            result: JSON.stringify({
              home_score: event.homeScore,
              away_score: event.awayScore,
              injury: event.injury,
              time: event.time
            }),
            slug: event.slug,
            start_time: event.startTimestamp,
            custom_id: event.customId,
            match_id: event.id
          }
        }))
        console.log(res.hasNextPage)
        console.log({ seed })
        console.log(res.events.some(event => event.status?.code != 100))
        if (!res.hasNextPage) break
        if (seed) continue
        if (res.events.some(event => event.status?.code != 100)) break
      }

      return Promise.resolve(data)
    } catch (error) {
      console.log('error _getMatches: ', error.message)
      throw new Error(error.message)
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}
