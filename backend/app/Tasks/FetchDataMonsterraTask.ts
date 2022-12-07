const { CronJob } = require('cron');
import GoogleSheetApiService from 'App/Services/GoogleSheetApiService'

class FetchDataMonsterraTask {
    async start() {
        try {
            await new GoogleSheetApiService().getMonsterraEventSheet()
        } catch (error) {
            console.log('error FetchDataMonsterraTask: ', error.message)
        }
    }
}

const fetchDataMonsterraTask = () => {
    const job = new CronJob(
        process.env.NODE_ENV == 'production' ? '0 0 */6 * * *' : '0 */5 * * * *',
        function () {
            new FetchDataMonsterraTask().start()
        }
    );
    job.start()
}

export default fetchDataMonsterraTask

module.exports = fetchDataMonsterraTask