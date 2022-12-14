import Job from '../Jobs/FetchUserBettingJob'

const BETTING_START_BLOCK = process.env.BETTING_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const USER_BETTING = 'UserBetting'
const USER_CLAIM = 'UserClaim'
const USER_PREDICT = 'UserPredicting'

let ARRAY_EVENTS = [USER_BETTING, USER_CLAIM, USER_PREDICT]

const initTask = async () => {
  if (!BETTING_START_BLOCK) {
    return
  }
  try {
    let currentBlock = BETTING_START_BLOCK

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
