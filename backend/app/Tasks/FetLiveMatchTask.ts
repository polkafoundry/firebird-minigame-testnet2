const { CronJob } = require('cron');
import Logger from '@ioc:Adonis/Core/Logger'
const Const = require('@ioc:App/Common/Const')

import { updateMatchJob } from 'App/Jobs/UpdateMatchJob'
import MatchService from 'App/Services/MatchService'
import MatchApiService from 'App/Services/MatchApiService'

class FetchLiveMatch {
	async fetchLiveMatch() {
		try {
			// Do somethign with you job data
			const liveMatches = await new MatchService().getLiveMatch()
			Logger.info(`liveMatches: ${JSON.stringify(liveMatches)}`)
			console.log('liveMatches: ', liveMatches)
			if (!liveMatches.length) return
			await Promise.all(liveMatches.map((match) => this._updateLiveMatch(match)))
		} catch (error) {
			console.log('error FetchLiveMatchJob: ', error.message)
		}
	}
	private async _updateLiveMatch(match) {
		const matchData: any = await new MatchApiService().getData({
			url: `https://api.sofascore.com/api/v1/event/${match.sofa_match_id}`,
		})
		console.log('matchData: ', JSON.stringify(matchData))
		let data: any = {
			id: match.id,
			ht_home_score: matchData.event?.homeScore?.period1,
			ft_home_score: matchData.event?.homeScore?.normaltime || matchData.event?.homeScore?.display || matchData.event?.homeScore?.period1,
			ht_away_score: matchData.event?.awayScore?.period1,
			ft_away_score: matchData.event?.awayScore?.normaltime || matchData.event?.awayScore?.display || matchData.event?.awayScore?.period1,
		}

		if (matchData.event?.status?.code != 0) {
			data.match_status = Const.MATCH_STATUS.LIVE
		}
		if ([7, 31].includes(matchData.event?.status?.code)) {
			data.is_half_time = true
		}
		if (matchData.event?.status?.code == 100) {
			data.is_half_time = true
			data.is_full_time = true
			data.match_status = Const.MATCH_STATUS.FINISHED
		}
		if (matchData.event?.status?.code == 60) {
			data.match_status = Const.MATCH_STATUS.POSTPONED
		}

		return updateMatchJob(data)
	}
}

const fetchLivematchSchedule = async () => {
	const job = new CronJob(
		'0 */5 * * * *', // 5 minute
		function () {
			new FetchLiveMatch().fetchLiveMatch()
		}
	);
	job.start()
}

export default fetchLivematchSchedule

module.exports = fetchLivematchSchedule