import Job from '../Jobs/FetchGiftCodeJob'

const GIFT_CODE_START_BLOCK = process.env.GIFT_CODE_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const USER_USE_CODE = 'UserUseCode'

let ARRAY_EVENTS = [USER_USE_CODE]

const initTask = async () => {
  if (!GIFT_CODE_START_BLOCK) {
    return
  }
  try {
    let currentBlock = GIFT_CODE_START_BLOCK
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
