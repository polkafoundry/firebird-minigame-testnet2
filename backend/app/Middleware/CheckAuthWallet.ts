import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException';
const Const = require('@ioc:App/Common/Const')

export default class CheckAuthWallet {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const headers = request.headers();
    const wallet_address = headers.authorization
    if (!Const.ADMIN_ACCOUNT.includes(wallet_address)) throw new UnauthorizedException('Not Authorized!');
    await next()
  }
}
