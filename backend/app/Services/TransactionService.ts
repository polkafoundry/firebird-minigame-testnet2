const Const = require('@ioc:App/Common/Const')
const Transaction = require('ethereumjs-tx')

export default class GoogleSheetApiService {
    public HelperUtils = require('@ioc:App/Common/HelperUtils')

    async sendTransaction(data, pKey) {
        try {
            const web3 = await this.HelperUtils.getWeb3Provider()

            const privateKey = Buffer.from(pKey, 'hex')
            let walletAddress = web3.eth.accounts.privateKeyToAccount('0x' + pKey).address

            const [gasPrice, estimateGas, nonce] = await Promise.all([
                web3.eth.getGasPrice(),
                web3.eth.estimateGas({
                    from: walletAddress,
                    to: data.to,
                    data: data.data
                }),
                web3.eth.getTransactionCount(walletAddress, 'pending'),
            ])

            const txObject = {
                ...data,
                from: walletAddress,
                nonce: nonce,
                gas: estimateGas,
                gasPrice: '0x' + (Number(gasPrice)).toString(16),
                chainId: 9000,
            }

            const tx = new Transaction(txObject)

            tx.sign(privateKey)

            const rawTx = '0x' + tx.serialize().toString('hex')

            const res = await web3.eth.sendSignedTransaction(rawTx)
            return res.transactionHash
        } catch (error) {
            console.log('errorr: ', error)
            throw new Error(error.message)
        }
    }
}
