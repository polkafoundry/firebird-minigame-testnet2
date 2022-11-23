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
                        },
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                            'authority': 'api.sofascore.com',
                            'accept-encoding': 'gzip, deflate, br',
                            'accept-language': 'vi, en; q = 0.9',
                            'cache-control': 'max-age=0',
                            'if-none-match': `W/"afa5a590d8"`,
                            'origin': 'https://www.sofascore.com',
                            'referer': 'https://www.sofascore.com/',
                            'sec-ch-ua': `"Google Chrome"; v = "107", "Chromium"; v = "107", "Not=A?Brand"; v = "24"`,
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': `"Linux"`,
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-site'
                        }
                    })
                    if (typeof res.data != 'object') throw new Error('error response')
                    return resolve(res.data)
                } catch (error) {
                    console.log('error get data from api: ', error.message)
                    if (count++ >= 10) return reject(error.message)
                }
            }
        })
    }
}