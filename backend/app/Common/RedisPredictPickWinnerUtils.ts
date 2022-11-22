import Redis from '@ioc:Adonis/Addons/Redis'

/*
  PredictPickWinner top collections
 */
const getRedisKeyPredictPickWinnerTopCollections = () => {
  return `predict_pick_winner_top_collections`
}

const getRedisPredictPickWinnerTopCollections = async () => {
  return await Redis.get(getRedisKeyPredictPickWinnerTopCollections())
}

const setRedisPredictPickWinnerTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictPickWinnerTopCollections(), JSON.stringify(data))
}

const existRedisPredictPickWinnerTopCollections = async () => {
  return await Redis.exists(getRedisKeyPredictPickWinnerTopCollections())
}

const deleteRedisPredictPickWinnerTopCollections = () => {
  let redisKey = getRedisKeyPredictPickWinnerTopCollections()
  Redis.del(redisKey)
}

/*
  PredictPickWinner collections
 */
const getRedisKeyPredictPickWinnerSupportCollections = () => {
  return `predict_pick_winner_support_collections`
}

const getRedisPredictPickWinnerSupportCollections = async () => {
  return await Redis.get(getRedisKeyPredictPickWinnerSupportCollections())
}

const setRedisPredictPickWinnerSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictPickWinnerSupportCollections(), JSON.stringify(data))
}

const existRedisPredictPickWinnerSupportCollections = async () => {
  return await Redis.exists(getRedisKeyPredictPickWinnerSupportCollections())
}

const deleteRedisPredictPickWinnerSupportCollections = () => {
  let redisKey = getRedisKeyPredictPickWinnerSupportCollections()
  Redis.del(redisKey)
}

/*
  PredictPickWinner collection detail
 */
const getRedisKeyPredictPickWinnerCollectionDetail = (id) => {
  return `predict_pick_winner_collection_detail_${id}`
}

const getRedisPredictPickWinnerCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyPredictPickWinnerCollectionDetail(id))
}

const setRedisPredictPickWinnerCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyPredictPickWinnerCollectionDetail(id), JSON.stringify(data))
}

const existRedisPredictPickWinnerCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyPredictPickWinnerCollectionDetail(id))
}

const deleteRedisPredictPickWinnerCollectionDetail = (id) => {
  let redisKey = getRedisKeyPredictPickWinnerCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  PredictPickWinner block number
 */
const getRedisKeyPredictPickWinnerBlockNumber = (event_type) => {
  return `predict_pick_winner_block_number_${event_type}`
}

const getRedisPredictPickWinnerBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyPredictPickWinnerBlockNumber(event_type))
}

const setRedisPredictPickWinnerBlockNumber = async (data) => {
  return await Redis.set(
    getRedisKeyPredictPickWinnerBlockNumber(data.event_type),
    JSON.stringify(data)
  )
}

const existRedisPredictPickWinnerBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyPredictPickWinnerBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyPredictPickWinnerSlug = (token_address) => {
  return `predict_pick_winner_slug_${token_address}`
}

const getRedisPredictPickWinnerSlug = async (token_address) => {
  return await Redis.get(getRedisKeyPredictPickWinnerSlug(token_address))
}

const setRedisPredictPickWinnerSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyPredictPickWinnerSlug(token_address), JSON.stringify(slug))
}

const existRedisPredictPickWinnerSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyPredictPickWinnerSlug(token_address))
}

const deleteRedisPredictPickWinnerSlug = (token_address) => {
  let redisKey = getRedisKeyPredictPickWinnerSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisPredictPickWinnerTopCollections,
  setRedisPredictPickWinnerTopCollections,
  existRedisPredictPickWinnerTopCollections,
  deleteRedisPredictPickWinnerTopCollections,

  getRedisPredictPickWinnerSupportCollections,
  setRedisPredictPickWinnerSupportCollections,
  existRedisPredictPickWinnerSupportCollections,
  deleteRedisPredictPickWinnerSupportCollections,

  // collection
  getRedisPredictPickWinnerCollectionDetail,
  setRedisPredictPickWinnerCollectionDetail,
  existRedisPredictPickWinnerCollectionDetail,
  deleteRedisPredictPickWinnerCollectionDetail,

  // marketplace block number
  getRedisPredictPickWinnerBlockNumber,
  setRedisPredictPickWinnerBlockNumber,
  existRedisPredictPickWinnerBlockNumber,

  // marketplace slug
  getRedisKeyPredictPickWinnerSlug,
  getRedisPredictPickWinnerSlug,
  setRedisPredictPickWinnerSlug,
  existRedisPredictPickWinnerSlug,
  deleteRedisPredictPickWinnerSlug,
}
