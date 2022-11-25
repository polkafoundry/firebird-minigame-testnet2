import { JobContract } from '@ioc:Rocketseat/Bull'
import MatchModel from 'App/Models/Match'
import PredictModel from 'App/Models/Predict'
import Database from '@ioc:Adonis/Lucid/Database'
import PredictWinner from 'App/Models/PredictWinner'

const Const = require('@ioc:App/Common/Const')

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

      let predict = await PredictModel.query()
        .where('match_id', match.match_id)
        .andWhere('match_predicted', false)
        .first()
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

      const r1Address: string[] = []
      const logFilterAddress: string[] = []
      const r2Address: string[] = []

      const listWinner = await PredictModel.query()
        .where('match_id', match.match_id)
        .andWhere('match_predicted', true)
        .andWhere('result', true)
        .exec()
      if (!listWinner || listWinner.length === 0) {
        return
      }
      //get user log
      let logUser = await Database.from('user_logs')
        .select('user_address')
        .count('* as total')
        .groupBy('user_address')
      //filter with log user
      for (let i = 0; i < listWinner.length; i++) {
        r2Address.push(listWinner[i].user_address)
        logUser.filter((e) => {
          if (e.user_address === listWinner[i].user_address) {
            logFilterAddress.push(listWinner[i].user_address)
          }
        })
      }

      //get user betting
      let betUser = await Database.from('bettings')
        .where('match_id', match.match_id)
        .select('user_address')
        .groupBy('user_address')
      //filter with betting user
      for (let i = 0; i < logFilterAddress.length; i++) {
        betUser.filter((e) => {
          if (e.user_address === logFilterAddress[i]) {
            r1Address.push(logFilterAddress[i])
          }
        })
      }
      let winner: any = null

      if (r1Address.length === 0) {
        //random r2
        winner = r2Address[Math.floor(Math.random() * r2Address.length)]
      } else {
        //random r1
        winner = r1Address[Math.floor(Math.random() * r1Address.length)]
      }

      const predictMatch = await PredictWinner.query().where('match_id', match.match_id).first()
      if (predictMatch) {
        return
      }
      let data = new PredictWinner()
      data.transaction_hash = '0x316df6b949b9d97dd0f2630ec5af7c024a7d38b11f4ff84bc1441d5790a0a2fd' //fake
      data.transaction_index = 1
      data.block_number = 1752068 //fake
      data.dispatch_at = Date.now() / 1000
      data.event_type = 'RequestRandomNumber'
      data.match_id = match.match_id
      data.req_id = '0xb1770bc6723967efe53520fe93295bd8e4c5e995da38feb5bdc1e5723be5a9ce' //fake
      data.predict_winner = match.match_id.toString()
      data.final_winner = winner
      data.randomness = 0
      data.rewards = Const.PREDICT_REWARD_BY_ROUND[match.round_name]

      await data.save()

      await MatchModel.query().where('match_id', match.match_id).update({
        is_pick_predict_final_winners: true,
      })
    } catch (error) {
      console.log('CalcPredictJob', error)
    }
  }
}
