import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseException from 'App/Exceptions/BaseException'
// Exception for integration with game backend
export default class IntegrationException extends BaseException {
  private readonly msg: string
  constructor(message?: string) {
    super('', 400, 'integration.exception')
    this.msg = message || 'Integration exception'
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      status: error.status,
      code: error.code,
      message: this.msg,
    })
  }
}
