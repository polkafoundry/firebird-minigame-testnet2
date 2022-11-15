import Redis from '@ioc:Adonis/Addons/Redis'

/*
  Predict top collections
 */
const getRedisKeyPredictTopCollections = () => {
  return `predict_top_collections`
}

const getRedisPredictTopCollections = async () => {
  return await Redis.get(getRedisKeyPredictTopCollections())
}

const setRedisPredictTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictTopCollections(), JSON.stringify(data))
}

const existRedisPredictTopCollections = async () => {
  return await Redis.exists(getRedisKeyPredictTopCollections())
}

const deleteRedisPredictTopCollections = () => {
  let redisKey = getRedisKeyPredictTopCollections()
  Redis.del(redisKey)
}

/*
  Predict collections
 */
const getRedisKeyPredictSupportCollections = () => {
  return `predict_support_collections`
}

const getRedisPredictSupportCollections = async () => {
  return await Redis.get(getRedisKeyPredictSupportCollections())
}

const setRedisPredictSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPredictSupportCollections(), JSON.stringify(data))
}

const existRedisPredictSupportCollections = async () => {
  return await Redis.exists(getRedisKeyPredictSupportCollections())
}

const deleteRedisPredictSupportCollections = () => {
  let redisKey = getRedisKeyPredictSupportCollections()
  Redis.del(redisKey)
}

/*
  Predict collection detail
 */
const getRedisKeyPredictCollectionDetail = (id) => {
  return `predict_collection_detail_${id}`
}

const getRedisPredictCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyPredictCollectionDetail(id))
}

const setRedisPredictCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyPredictCollectionDetail(id), JSON.stringify(data))
}

const existRedisPredictCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyPredictCollectionDetail(id))
}

const deleteRedisPredictCollectionDetail = (id) => {
  let redisKey = getRedisKeyPredictCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  Predict block number
 */
const getRedisKeyPredictBlockNumber = (event_type) => {
  return `predict_block_number_${event_type}`
}

const getRedisPredictBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyPredictBlockNumber(event_type))
}

const setRedisPredictBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyPredictBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisPredictBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyPredictBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyPredictSlug = (token_address) => {
  return `predict_slug_${token_address}`
}

const getRedisPredictSlug = async (token_address) => {
  return await Redis.get(getRedisKeyPredictSlug(token_address))
}

const setRedisPredictSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyPredictSlug(token_address), JSON.stringify(slug))
}

const existRedisPredictSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyPredictSlug(token_address))
}

const deleteRedisPredictSlug = (token_address) => {
  let redisKey = getRedisKeyPredictSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisPredictTopCollections,
  setRedisPredictTopCollections,
  existRedisPredictTopCollections,
  deleteRedisPredictTopCollections,

  getRedisPredictSupportCollections,
  setRedisPredictSupportCollections,
  existRedisPredictSupportCollections,
  deleteRedisPredictSupportCollections,

  // collection
  getRedisPredictCollectionDetail,
  setRedisPredictCollectionDetail,
  existRedisPredictCollectionDetail,
  deleteRedisPredictCollectionDetail,

  // marketplace block number
  getRedisPredictBlockNumber,
  setRedisPredictBlockNumber,
  existRedisPredictBlockNumber,

  // marketplace slug
  getRedisKeyPredictSlug,
  getRedisPredictSlug,
  setRedisPredictSlug,
  existRedisPredictSlug,
  deleteRedisPredictSlug,
}
