import Redis from '@ioc:Adonis/Addons/Redis'

const getIsSendingMFKey = () => {
    return 'is_sending_to_mf'
}

const getRedisData = (key) => {
    return Redis.get(key)
}

const setRedisData = (key, data) => {
    return Redis.set(key, JSON.stringify(data))
}

export default {
    getIsSendingMFKey,
    getRedisData,
    setRedisData
}