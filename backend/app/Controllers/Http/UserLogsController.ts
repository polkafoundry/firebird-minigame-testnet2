import UserLogsService from '@ioc:Firebird/UserLogsService'

export default class UserLogsController {
  public async saveLogs({ request }) {
    return await UserLogsService.saveLogs(request)
  }
}
