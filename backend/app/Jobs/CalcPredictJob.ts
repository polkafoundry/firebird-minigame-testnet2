import { JobContract } from '@ioc:Rocketseat/Bull'
import MatchModel from 'App/Models/Match'
import PredictModel from 'App/Models/Predict'

export default class CalcPredictJob implements JobContract {
  public key = 'CalcPredictJob'

  public async handle(job) {
    const { data } = job
    console.log('CalcBettingJob: ', data)
    let match = await MatchModel.query()
      .where('is_full_time', true)
      .andWhere('is_pick_predict_final_winners', false)
      .first()
    if (!match) {
      return
    }
    let predicts = await PredictModel.query()
      .where('match_id', match.match_id)
      .where('match_predicted', false)
      .exec()
    if (predicts && predicts.length > 0) {
      for (let i = 0; i < predicts.length; i++) {
        if (
          match.ft_home_score == predicts[i].home_score &&
          match.ft_away_score == predicts[i].away_score
        ) {
          await PredictModel.query()
            .where('match_id', predicts[i].match_id)
            .where('user_address', predicts[i].user_address)
            .update({
              result: true,
              match_predicted: true,
            })
        } else {
          await PredictModel.query()
            .where('match_id', predicts[i].match_id)
            .where('user_address', predicts[i].user_address)
            .update({
              result: false,
              match_predicted: true,
            })
        }
      }
    }
  }
}
