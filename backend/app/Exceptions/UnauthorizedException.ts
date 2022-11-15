import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseException from 'App/Exceptions/BaseException'

export default class UnauthorizedException extends BaseException {
    private readonly msg: string
    constructor(message?: string) {
        super('', 401, 'unauthorized')
        this.msg = message || 'Unauthorized exception'
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            status: error.status,
            code: error.code,
            message: this.msg,
        })
    }
}
