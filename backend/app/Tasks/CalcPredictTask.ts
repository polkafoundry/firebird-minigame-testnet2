import Job from '../Jobs/CalcPredictJob'
import Bull from '@ioc:Rocketseat/Bull'

/* Ranges from 1 (highest priority) to MAX_INT (lowest priority). */
const priority = 2
/* The total number of attempts to try the job until it completes.*/
const attempts = 1

const initTask = async (data) => {
  try {
    const jobKey = new Job().key
    await Bull.getByKey(jobKey).bull.add(jobKey, data, {
      priority: priority,
      removeOnComplete: true,
      repeat: {
        every: 5 * 60 * 1000,
        immediately: true,
      },
      removeOnFail: true,
      attempts: attempts,
    })
  } catch (e) {
    console.log('error: ', e.message)
    console.error()
  } finally {
  }
}

module.exports = {
  initTask,
}
