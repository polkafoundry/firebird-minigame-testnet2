const { CronJob } = require('cron');

import MatchModel from 'App/Models/Match'
import BettingModel from 'App/Models/Betting'
import RecalcBetting from 'App/Models/RecalcBetting';
import MetaForceService from 'App/Services/MetaForceService';

class RecalcBettingTask {
    async recalcBetting() {
        try {
            const recalcBetting = await RecalcBetting.query().where('is_executed', false).first()
            if (!recalcBetting) return
            let bettings = await BettingModel.query().where('match_id', recalcBetting.match_id).orderBy('sent_to_mf_at', 'asc')
            if (!bettings.length) return RecalcBetting.query().where('id', recalcBetting.id).update({ is_executed: true })

            const startTime = +bettings[0].sent_to_mf_at
            const endTime = +bettings[bettings.length - 1].sent_to_mf_at

            await new MetaForceService().removeData({ startTime: new Date(startTime).toISOString(), endTime: new Date(endTime).toISOString() })

            await Promise.all([
                RecalcBetting.query().where('id', recalcBetting.id).update({ is_executed: true }),
                BettingModel.query().where('sent_to_mf_at', '>=', startTime).where('sent_to_mf_at', '<=', endTime).where('match_id', recalcBetting.match_id).update({ is_calculated: false, is_sent_to_mf: false }),
                BettingModel.query().where('sent_to_mf_at', '>=', startTime).where('sent_to_mf_at', '<=', endTime).whereNot('match_id', recalcBetting.match_id).update({ is_sent_to_mf: false }),
                MatchModel.query().where('match_id', recalcBetting.match_id).update({ is_calculated_ou_ht: false, is_calculated_ou_ft: false, is_calculated_odds_ht: false, is_calculated_odds_ft: false })
            ])
        } catch (error) {
            console.log('error recalcBetting: ', error.message)
        }
    }
}

const recalcBettingTask = () => {
    const job = new CronJob(
        '*/5 * * * * *',
        function () {
            new RecalcBettingTask().recalcBetting()
        }
    );
    job.start()
}

export default recalcBettingTask

module.exports = recalcBettingTask