import Redis from '@ioc:Adonis/Addons/Redis'

/*
  PredictWinner top collections
 */
const getRedisKeyPredictWinnerTopCollections = () => {
  return `predict_winner_top_collections`
}

const getRedisPredictWinnerTopCollections = async () => {
  return await Redis.get(getRedisKeyPredictWinnerTopCollections())
}

const setRedisPredictWinnerTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerTopCollections(), JSON.stringify(data))
}

const existRedisPredictWinnerTopCollections = async () => {
  return await Redis.exists(getRedisKeyPredictWinnerTopCollections())
}

const deleteRedisPredictWinnerTopCollections = () => {
  let redisKey = getRedisKeyPredictWinnerTopCollections()
  Redis.del(redisKey)
}

/*
  PredictWinner collections
 */
const getRedisKeyPredictWinnerSupportCollections = () => {
  return `predict_winner_support_collections`
}

const getRedisPredictWinnerSupportCollections = async () => {
  return await Redis.get(getRedisKeyPredictWinnerSupportCollections())
}

const setRedisPredictWinnerSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerSupportCollections(), JSON.stringify(data))
}

const existRedisPredictWinnerSupportCollections = async () => {
  return await Redis.exists(getRedisKeyPredictWinnerSupportCollections())
}

const deleteRedisPredictWinnerSupportCollections = () => {
  let redisKey = getRedisKeyPredictWinnerSupportCollections()
  Redis.del(redisKey)
}

/*
  PredictWinner collection detail
 */
const getRedisKeyPredictWinnerCollectionDetail = (id) => {
  return `predict_winner_collection_detail_${id}`
}

const getRedisPredictWinnerCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyPredictWinnerCollectionDetail(id))
}

const setRedisPredictWinnerCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerCollectionDetail(id), JSON.stringify(data))
}

const existRedisPredictWinnerCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyPredictWinnerCollectionDetail(id))
}

const deleteRedisPredictWinnerCollectionDetail = (id) => {
  let redisKey = getRedisKeyPredictWinnerCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  PredictWinner block number
 */
const getRedisKeyPredictWinnerBlockNumber = (event_type) => {
  return `predict_winner_block_number_${event_type}`
}

const getRedisPredictWinnerBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyPredictWinnerBlockNumber(event_type))
}

const setRedisPredictWinnerBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyPredictWinnerBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisPredictWinnerBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyPredictWinnerBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyPredictWinnerSlug = (token_address) => {
  return `predict_winner_slug_${token_address}`
}

const getRedisPredictWinnerSlug = async (token_address) => {
  return await Redis.get(getRedisKeyPredictWinnerSlug(token_address))
}

const setRedisPredictWinnerSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyPredictWinnerSlug(token_address), JSON.stringify(slug))
}

const existRedisPredictWinnerSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyPredictWinnerSlug(token_address))
}

const deleteRedisPredictWinnerSlug = (token_address) => {
  let redisKey = getRedisKeyPredictWinnerSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisPredictWinnerTopCollections,
  setRedisPredictWinnerTopCollections,
  existRedisPredictWinnerTopCollections,
  deleteRedisPredictWinnerTopCollections,

  getRedisPredictWinnerSupportCollections,
  setRedisPredictWinnerSupportCollections,
  existRedisPredictWinnerSupportCollections,
  deleteRedisPredictWinnerSupportCollections,

  // collection
  getRedisPredictWinnerCollectionDetail,
  setRedisPredictWinnerCollectionDetail,
  existRedisPredictWinnerCollectionDetail,
  deleteRedisPredictWinnerCollectionDetail,

  // marketplace block number
  getRedisPredictWinnerBlockNumber,
  setRedisPredictWinnerBlockNumber,
  existRedisPredictWinnerBlockNumber,

  // marketplace slug
  getRedisKeyPredictWinnerSlug,
  getRedisPredictWinnerSlug,
  setRedisPredictWinnerSlug,
  existRedisPredictWinnerSlug,
  deleteRedisPredictWinnerSlug,
}
