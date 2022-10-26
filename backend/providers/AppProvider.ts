import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MatchService from 'App/Services/MatchService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Firebird/MatchService', () => new MatchService())
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
