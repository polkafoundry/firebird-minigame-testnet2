import Redis from '@ioc:Adonis/Addons/Redis'

/*
  Betting top collections
 */
const getRedisKeyBettingTopCollections = () => {
  return `betting_top_collections`
}

const getRedisBettingTopCollections = async () => {
  return await Redis.get(getRedisKeyBettingTopCollections())
}

const setRedisBettingTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyBettingTopCollections(), JSON.stringify(data))
}

const existRedisBettingTopCollections = async () => {
  return await Redis.exists(getRedisKeyBettingTopCollections())
}

const deleteRedisBettingTopCollections = () => {
  let redisKey = getRedisKeyBettingTopCollections()
  Redis.del(redisKey)
}

/*
  Betting collections
 */
const getRedisKeyBettingSupportCollections = () => {
  return `betting_support_collections`
}

const getRedisBettingSupportCollections = async () => {
  return await Redis.get(getRedisKeyBettingSupportCollections())
}

const setRedisBettingSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyBettingSupportCollections(), JSON.stringify(data))
}

const existRedisBettingSupportCollections = async () => {
  return await Redis.exists(getRedisKeyBettingSupportCollections())
}

const deleteRedisBettingSupportCollections = () => {
  let redisKey = getRedisKeyBettingSupportCollections()
  Redis.del(redisKey)
}

/*
  Betting collection detail
 */
const getRedisKeyBettingCollectionDetail = (id) => {
  return `betting_collection_detail_${id}`
}

const getRedisBettingCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyBettingCollectionDetail(id))
}

const setRedisBettingCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyBettingCollectionDetail(id), JSON.stringify(data))
}

const existRedisBettingCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyBettingCollectionDetail(id))
}

const deleteRedisBettingCollectionDetail = (id) => {
  let redisKey = getRedisKeyBettingCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  Betting block number
 */
const getRedisKeyBettingBlockNumber = (event_type) => {
  return `betting_block_number_${event_type}`
}

const getRedisBettingBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyBettingBlockNumber(event_type))
}

const setRedisBettingBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyBettingBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisBettingBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyBettingBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyBettingSlug = (token_address) => {
  return `betting_slug_${token_address}`
}

const getRedisBettingSlug = async (token_address) => {
  return await Redis.get(getRedisKeyBettingSlug(token_address))
}

const setRedisBettingSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyBettingSlug(token_address), JSON.stringify(slug))
}

const existRedisBettingSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyBettingSlug(token_address))
}

const deleteRedisBettingSlug = (token_address) => {
  let redisKey = getRedisKeyBettingSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisBettingTopCollections,
  setRedisBettingTopCollections,
  existRedisBettingTopCollections,
  deleteRedisBettingTopCollections,

  getRedisBettingSupportCollections,
  setRedisBettingSupportCollections,
  existRedisBettingSupportCollections,
  deleteRedisBettingSupportCollections,

  // collection
  getRedisBettingCollectionDetail,
  setRedisBettingCollectionDetail,
  existRedisBettingCollectionDetail,
  deleteRedisBettingCollectionDetail,

  // marketplace block number
  getRedisBettingBlockNumber,
  setRedisBettingBlockNumber,
  existRedisBettingBlockNumber,

  // marketplace slug
  getRedisKeyBettingSlug,
  getRedisBettingSlug,
  setRedisBettingSlug,
  existRedisBettingSlug,
  deleteRedisBettingSlug,
}
