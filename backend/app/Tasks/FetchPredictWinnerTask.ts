import Job from '../Jobs/FetchPredictWinnerJob'

const PREDICT_WINNER_START_BLOCK = process.env.PREDICT_WINNER_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const REQUEST_RANDOM_NUMBER = 'RequestRandomNumber'
const RECEIVE_RANDOM_NUMBER = 'ReceiveRandomNumber'

let ARRAY_EVENTS = [REQUEST_RANDOM_NUMBER, RECEIVE_RANDOM_NUMBER]

const initTask = async () => {
  if (!PREDICT_WINNER_START_BLOCK) {
    return
  }
  try {
    let currentBlock = PREDICT_WINNER_START_BLOCK
    for (const eventType of ARRAY_EVENTS) {
      let data = {
        event_type: eventType,
        from: currentBlock,
        notCached: false,
      }

      const jobKey = new Job().key

      await Bull.getByKey(jobKey).bull.add(jobKey + eventType, data, {
        repeat: {
          every: 1000 * 60, // 1 minutes
          immediately: true,
        },
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
      })
    }
  } catch (e) {
    console.error()
  } finally {
  }
}

module.exports = {
  initTask,
}
