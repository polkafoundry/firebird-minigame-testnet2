import axios from 'axios'
const Const = require('App/Common/Const')

export default class MatchService {
    getData({ url }) {
        return new Promise(async (resolve, reject) => {
            let count = 0;
            let res
            while (true) {
                try {
                    const proxyList = Const.PROXY_LIST
                    const randProxy = proxyList[Math.floor(Math.random() * proxyList.length)]

                    res = await axios({
                        method: 'get',
                        url,
                        timeout: 1000 * 10,  // 10 second
                        proxy: {
                            protocol: 'http',
                            host: randProxy.split(':')[0],
                            port: randProxy.split(':')[1]
                        }
                    })
                    if (typeof res.data != 'object') throw new Error('error response')
                    return resolve(res.data)
                } catch (error) {
                    console.log('error get data from api: ', error.message)
                    if (count++ >= 5) return reject(error.message)
                }
            }
        })
    }
}