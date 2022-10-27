import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Bull from '@ioc:Rocketseat/Bull'
import FetchUpcomingMatchJob from '../../app/Jobs/FetchUpcomingMatchJob'

export default class FetchAllMatchSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const jobKey = new FetchUpcomingMatchJob().key
    await Bull.getByKey(jobKey).bull.add(jobKey, { seed: true }, {
      priority: 1,
      removeOnComplete: true,
      removeOnFail: true
    })
  }
}
