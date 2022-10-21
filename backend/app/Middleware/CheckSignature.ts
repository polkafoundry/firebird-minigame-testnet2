import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import InvalidParamException from 'App/Exceptions/InvalidParamException'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import { toChecksumAddress } from 'web3-utils'

export default class CheckSignature {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    try {
      const deadline = request.input('deadline')
      const walletAddress = request.input('wallet')
      const signature = request.input('signature')

      if (!deadline || isNaN(deadline)) throw new InvalidParamException('deadline required')
      if (!walletAddress) throw new InvalidParamException('wallet required')
      if (!signature) throw new InvalidParamException('signature required')
      if (Date.now() / 1000 >= deadline) throw new ForbiddenException('Signature expired')

      const msgParams = JSON.stringify({
        domain: {
          version: '1',
        },
        message: {
          wallet: walletAddress,
          deadline: deadline,
        },
        primaryType: 'Signature',
        types: {
          EIP712Domain: [{ name: 'version', type: 'string' }],
          // Refer to PrimaryType
          Signature: [
            { name: 'wallet', type: 'string' },
            { name: 'deadline', type: 'uint256' },
          ],
        },
      })
      const recoverAddress = recoverTypedSignature_v4({
        data: JSON.parse(msgParams),
        sig: signature,
      })

      if (toChecksumAddress(recoverAddress) !== toChecksumAddress(walletAddress)) {
        throw new ForbiddenException('Invalid signature!')
      }

      await next()
    } catch (e) {
      throw e
    }
  }
}
