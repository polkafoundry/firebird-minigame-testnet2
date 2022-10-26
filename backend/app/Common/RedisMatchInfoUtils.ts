import Redis from '@ioc:Adonis/Addons/Redis'

/*
  Match top collections
 */
const getRedisKeyMatchTopCollections = () => {
  return `match_top_collections`
}

const getRedisMatchTopCollections = async () => {
  return await Redis.get(getRedisKeyMatchTopCollections())
}

const setRedisMatchTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyMatchTopCollections(), JSON.stringify(data))
}

const existRedisMatchTopCollections = async () => {
  return await Redis.exists(getRedisKeyMatchTopCollections())
}

const deleteRedisMatchTopCollections = () => {
  let redisKey = getRedisKeyMatchTopCollections()
  Redis.del(redisKey)
}

/*
  Match collections
 */
const getRedisKeyMatchSupportCollections = () => {
  return `match_support_collections`
}

const getRedisMatchSupportCollections = async () => {
  return await Redis.get(getRedisKeyMatchSupportCollections())
}

const setRedisMatchSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyMatchSupportCollections(), JSON.stringify(data))
}

const existRedisMatchSupportCollections = async () => {
  return await Redis.exists(getRedisKeyMatchSupportCollections())
}

const deleteRedisMatchSupportCollections = () => {
  let redisKey = getRedisKeyMatchSupportCollections()
  Redis.del(redisKey)
}

/*
  Match collection detail
 */
const getRedisKeyMatchCollectionDetail = (id) => {
  return `match_collection_detail_${id}`
}

const getRedisMatchCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyMatchCollectionDetail(id))
}

const setRedisMatchCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyMatchCollectionDetail(id), JSON.stringify(data))
}

const existRedisMatchCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyMatchCollectionDetail(id))
}

const deleteRedisMatchCollectionDetail = (id) => {
  let redisKey = getRedisKeyMatchCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  Match block number
 */
const getRedisKeyMatchBlockNumber = (event_type) => {
  return `match_block_number_${event_type}`
}

const getRedisMatchBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyMatchBlockNumber(event_type))
}

const setRedisMatchBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyMatchBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisMatchBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyMatchBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyMatchSlug = (token_address) => {
  return `match_slug_${token_address}`
}

const getRedisMatchSlug = async (token_address) => {
  return await Redis.get(getRedisKeyMatchSlug(token_address))
}

const setRedisMatchSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyMatchSlug(token_address), JSON.stringify(slug))
}

const existRedisMatchSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyMatchSlug(token_address))
}

const deleteRedisMatchSlug = (token_address) => {
  let redisKey = getRedisKeyMatchSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisMatchTopCollections,
  setRedisMatchTopCollections,
  existRedisMatchTopCollections,
  deleteRedisMatchTopCollections,

  getRedisMatchSupportCollections,
  setRedisMatchSupportCollections,
  existRedisMatchSupportCollections,
  deleteRedisMatchSupportCollections,

  // collection
  getRedisMatchCollectionDetail,
  setRedisMatchCollectionDetail,
  existRedisMatchCollectionDetail,
  deleteRedisMatchCollectionDetail,

  // marketplace block number
  getRedisMatchBlockNumber,
  setRedisMatchBlockNumber,
  existRedisMatchBlockNumber,

  // marketplace slug
  getRedisKeyMatchSlug,
  getRedisMatchSlug,
  setRedisMatchSlug,
  existRedisMatchSlug,
  deleteRedisMatchSlug,
}
