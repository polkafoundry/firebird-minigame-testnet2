import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseException from 'App/Exceptions/BaseException'

export default class BusinessException extends BaseException {
  private readonly msg: string
  constructor(message?: string) {
    super('', 400, 'business.exception')
    this.msg = message || 'Business exception'
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      status: error.status,
      code: error.code,
      message: this.msg,
    })
  }
}
