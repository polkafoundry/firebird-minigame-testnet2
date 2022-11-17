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
import PredictModel from 'App/Models/Predict'
import MatchModel from 'App/Models/Match'
import PredictWinnerModel from 'App/Models/PredictWinner'
const Transaction = require('ethereumjs-tx')

const Const = require('@ioc:App/Common/Const')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 2
/* Repeat after this amount of milliseconds */
const repeatEvery = 5 * 60 * 1000 // 1m
/* The total number of attempts to try the job until it completes.*/
const attempts = 1
let inProgress = false
export const requestRandomPredict = async () => {
  try {
    const jobKey = new RequestRandomPredictJob().key
    let options: any = {
      priority: priority,
      removeOnComplete: true,
      removeOnFail: true,
      repeat: {
        every: 1000 * 60 * 1, // 1 minutes
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

export default class RequestRandomPredictJob implements JobContract {
  public key = 'RequestRandomPredictJob'

  public async handle() {
    try {
      console.log('xxxx')
      if (inProgress) {
        return
      }
      inProgress = true
      const match = await MatchModel.query()
        .where('is_calculated_odds_ft', true)
        .where('is_pick_predict_final_winners', false)
        .first()

      if (!match) return
      const predict = await PredictModel.query()
        .where('match_id', match.match_id)
        .andWhere('match_predicted', false)
        .first()

      if (predict) return
      const predictWinner = await PredictWinnerModel.query()
        .where('match_id', match.match_id)
        .first()
      if (predictWinner) return

      let wlAddress = []
      const listWinner = await PredictModel.query()
        .where('match_id', match.match_id)
        .andWhere('match_predicted', true)
        .andWhere('result', true)
        .exec()
      if (!listWinner || listWinner.length === 0) {
        return
      }
      for (let i = 0; i < listWinner.length; i++) {
        wlAddress.push(listWinner[i].user_address)
      }

      console.log(match.match_id, wlAddress)

      const randomWinnerContract = await HelperUtils.getPredictWinnerContractInstance()
      const winnerInContract = await randomWinnerContract.methods.getWinnerInMatch(211).call()
      if (winnerInContract.length === 0) {
        const setWinnerList = await randomWinnerContract.methods
          .setListWinnerInMatch(match.match_id, wlAddress)
          .encodeABI()
        await this.callTransaction(setWinnerList)

        const pickWinner = await randomWinnerContract.methods
          .getRandomNumber(match.match_id)
          .encodeABI()
        await this.callTransaction(pickWinner)
      }
    } catch (error) {
      console.log('err add white list', error)
    }
  }
  private async callTransaction(callData) {
    try {
      const web3 = await HelperUtils.getWeb3Provider()

      const privateKey = Buffer.from(process.env.RANDOM_OWNER_PK, 'hex')

      let walletAddress = web3.eth.accounts.privateKeyToAccount(process.env.RANDOM_OWNER_PK).address
      const obj = {
        from: walletAddress,
        to: process.env.PREDICT_WINNER_SMART_CONTRACT,
        value: 0,
        data: callData,
      }

      const [gasPrice, nonce] = await Promise.all([
        web3.eth.getGasPrice(),
        web3.eth.getTransactionCount(walletAddress, 'pending'),
      ])

      const txObject = {
        ...obj,
        nonce: nonce,
        gas: 300000,
        gasPrice: '0x' + (Number(gasPrice) + 20 * Math.pow(10, 9)).toString(16),
        chainId: 9000,
      }

      const tx = new Transaction(txObject)

      tx.sign(privateKey)
      const rawTx = '0x' + tx.serialize().toString('hex')
      await web3.eth
        .sendSignedTransaction(rawTx)
        .on('transactionHash', function (hash) {
          console.log('xx', hash)
        })
        .on('receipt', function () {
          console.log('receipt')
        })
        .on('error', function (error) {
          console.log('errorxx', error)
        })
    } catch (error) {
      //   inProgress = false
      console.log('errorr: ', error)
    }
  }
}
