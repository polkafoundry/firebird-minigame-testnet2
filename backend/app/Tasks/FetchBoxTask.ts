import Job from '../Jobs/FetchBoxJob'

const BOX_START_BLOCK = process.env.BOX_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const BOX_CREATED = 'BoxCreated'
const BOX_OPENED = 'BoxOpened'
const BOX_TRANSFER = 'Transfer'

let ARRAY_EVENTS = [BOX_CREATED, BOX_OPENED, BOX_TRANSFER]

const initTask = async () => {
  if (!BOX_START_BLOCK) {
    return
  }

  try {
    let currentBlock = BOX_START_BLOCK

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
