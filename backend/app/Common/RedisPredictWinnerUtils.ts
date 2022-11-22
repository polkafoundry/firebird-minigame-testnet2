import Redis from '@ioc:Adonis/Addons/Redis'

/*
  PredictWinnerNew top collections
 */
const getRedisKeyPredictWinnerNewTopCollections = () => {
  return `predict_winner_new_top_collections`
}

const getRedisPredictWinnerNewTopCollections = async () => {
  return await Redis.get(getRedisKeyPredictWinnerNewTopCollections())
}

const setRedisPredictWinnerNewTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerNewTopCollections(), JSON.stringify(data))
}

const existRedisPredictWinnerNewTopCollections = async () => {
  return await Redis.exists(getRedisKeyPredictWinnerNewTopCollections())
}

const deleteRedisPredictWinnerNewTopCollections = () => {
  let redisKey = getRedisKeyPredictWinnerNewTopCollections()
  Redis.del(redisKey)
}

/*
  PredictWinnerNew collections
 */
const getRedisKeyPredictWinnerNewSupportCollections = () => {
  return `predict_winner_new_support_collections`
}

const getRedisPredictWinnerNewSupportCollections = async () => {
  return await Redis.get(getRedisKeyPredictWinnerNewSupportCollections())
}

const setRedisPredictWinnerNewSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerNewSupportCollections(), JSON.stringify(data))
}

const existRedisPredictWinnerNewSupportCollections = async () => {
  return await Redis.exists(getRedisKeyPredictWinnerNewSupportCollections())
}

const deleteRedisPredictWinnerNewSupportCollections = () => {
  let redisKey = getRedisKeyPredictWinnerNewSupportCollections()
  Redis.del(redisKey)
}

/*
  PredictWinnerNew collection detail
 */
const getRedisKeyPredictWinnerNewCollectionDetail = (id) => {
  return `predict_winner_new_collection_detail_${id}`
}

const getRedisPredictWinnerNewCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyPredictWinnerNewCollectionDetail(id))
}

const setRedisPredictWinnerNewCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerNewCollectionDetail(id), JSON.stringify(data))
}

const existRedisPredictWinnerNewCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyPredictWinnerNewCollectionDetail(id))
}

const deleteRedisPredictWinnerNewCollectionDetail = (id) => {
  let redisKey = getRedisKeyPredictWinnerNewCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  PredictWinnerNew block number
 */
const getRedisKeyPredictWinnerNewBlockNumber = (event_type) => {
  return `predict_winner_new_block_number_${event_type}`
}

const getRedisPredictWinnerNewBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyPredictWinnerNewBlockNumber(event_type))
}

const setRedisPredictWinnerNewBlockNumber = async (data) => {
  return await Redis.set(
    getRedisKeyPredictWinnerNewBlockNumber(data.event_type),
    JSON.stringify(data)
  )
}

const existRedisPredictWinnerNewBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyPredictWinnerNewBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyPredictWinnerNewSlug = (token_address) => {
  return `predict_winner_new_slug_${token_address}`
}

const getRedisPredictWinnerNewSlug = async (token_address) => {
  return await Redis.get(getRedisKeyPredictWinnerNewSlug(token_address))
}

const setRedisPredictWinnerNewSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerNewSlug(token_address), JSON.stringify(slug))
}

const existRedisPredictWinnerNewSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyPredictWinnerNewSlug(token_address))
}

const deleteRedisPredictWinnerNewSlug = (token_address) => {
  let redisKey = getRedisKeyPredictWinnerNewSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisPredictWinnerNewTopCollections,
  setRedisPredictWinnerNewTopCollections,
  existRedisPredictWinnerNewTopCollections,
  deleteRedisPredictWinnerNewTopCollections,

  getRedisPredictWinnerNewSupportCollections,
  setRedisPredictWinnerNewSupportCollections,
  existRedisPredictWinnerNewSupportCollections,
  deleteRedisPredictWinnerNewSupportCollections,

  // collection
  getRedisPredictWinnerNewCollectionDetail,
  setRedisPredictWinnerNewCollectionDetail,
  existRedisPredictWinnerNewCollectionDetail,
  deleteRedisPredictWinnerNewCollectionDetail,

  // marketplace block number
  getRedisPredictWinnerNewBlockNumber,
  setRedisPredictWinnerNewBlockNumber,
  existRedisPredictWinnerNewBlockNumber,

  // marketplace slug
  getRedisKeyPredictWinnerNewSlug,
  getRedisPredictWinnerNewSlug,
  setRedisPredictWinnerNewSlug,
  existRedisPredictWinnerNewSlug,
  deleteRedisPredictWinnerNewSlug,
}
