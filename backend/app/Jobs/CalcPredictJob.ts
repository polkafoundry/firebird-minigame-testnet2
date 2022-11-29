import { JobContract } from '@ioc:Rocketseat/Bull'
import MatchModel from 'App/Models/Match'
import PredictModel from 'App/Models/Predict'

export default class CalcPredictJob implements JobContract {
  public key = 'CalcPredictJob'

  public async handle() {
    try {
      let match = await MatchModel.query()
        .where('is_full_time', true)
        .andWhere('is_pick_predict_final_winners', false)
        .first()

      if (!match) {
        return
      }

      let predict = await PredictModel.query().where('match_predicted', false).first()
      if (!predict) {
        return
      }
      await PredictModel.query()
        .where('match_id', match.match_id)
        .where('home_score', match.ft_home_score)
        .where('away_score', match.ft_away_score)
        .where('match_predicted', false)
        .update({ result: true, match_predicted: true })
      await PredictModel.query()
        .where('match_id', match.match_id)
        .where('match_predicted', false)
        .update({ result: false, match_predicted: true })
    } catch (error) {
      console.log('CalcPredictJob', error)
    }
  }
}
