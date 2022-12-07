const Const = require('@ioc:App/Common/Const')
import { google } from 'googleapis'

export default class GoogleSheetApiService {
    public CrawlDataEventModel = require('@ioc:App/Models/CrawlDataEvent')
    public SendTransactionModel = require('@ioc:App/Models/SendTransaction')
    public SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    public sheets = google.sheets('v4')

    private async getAuthToken() {
        const auth = new google.auth.GoogleAuth({
            scopes: this.SCOPES,
            keyFile: 'google_sheet_credential.json'
        });
        const authToken = await auth.getClient();
        return authToken;
    }

    private async getSpreadSheetValues({ spreadsheetId, auth, range }): Promise<Array<any>> {
        const res = await this.sheets.spreadsheets.values.get({
            spreadsheetId,
            auth,
            range
        })
        return res.data.values || []
    }

    public async getMonsterraEventSheet() {
        const crawData = await this.CrawlDataEventModel.query().where('name', Const.CRAWL_DATA_EVENT.MONSTERRA_EVENT).first()
        let number = 2
        if (crawData) number = crawData.number
        const auth = await this.getAuthToken();
        let data = await this.getSpreadSheetValues({ spreadsheetId: Const.MONSTERRA_SHEET_ID, auth, range: `Sheet1!A${number}:B` })

        if (!data.length) return
        data = data.map(item => {
            return {
                address: item[0],
                token_address: Const.TOKEN_SMART_CONTRACT,
                value: item[1]
            }
        })

        await Promise.all([
            this.CrawlDataEventModel.updateOrCreate({ name: Const.CRAWL_DATA_EVENT.MONSTERRA_EVENT }, { number: number + data.length }),
            this.SendTransactionModel.createMany(data)
        ])
    }
}
