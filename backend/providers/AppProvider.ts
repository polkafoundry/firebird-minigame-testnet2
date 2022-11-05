import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MatchService from 'App/Services/MatchService'
import BettingService from 'App/Services/BettingService'
import ClaimService from 'App/Services/ClaimService'
import PredictWinnerService from 'App/Services/PredictWinnerService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Firebird/MatchService', () => new MatchService())
    this.app.container.singleton('Firebird/BettingService', () => new BettingService())
    this.app.container.singleton('Firebird/ClaimService', () => new ClaimService())
    this.app.container.singleton('Firebird/PredictWinnerService', () => new PredictWinnerService())
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
