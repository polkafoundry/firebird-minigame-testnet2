import Redis from '@ioc:Adonis/Addons/Redis'

/*
  Box top collections
 */
const getRedisKeyBoxTopCollections = () => {
  return `box_top_collections`
}

const getRedisBoxTopCollections = async () => {
  return await Redis.get(getRedisKeyBoxTopCollections())
}

const setRedisBoxTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyBoxTopCollections(), JSON.stringify(data))
}

const existRedisBoxTopCollections = async () => {
  return await Redis.exists(getRedisKeyBoxTopCollections())
}

const deleteRedisBoxTopCollections = () => {
  let redisKey = getRedisKeyBoxTopCollections()
  Redis.del(redisKey)
}

/*
  Box collections
 */
const getRedisKeyBoxSupportCollections = () => {
  return `box_support_collections`
}

const getRedisBoxSupportCollections = async () => {
  return await Redis.get(getRedisKeyBoxSupportCollections())
}

const setRedisBoxSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyBoxSupportCollections(), JSON.stringify(data))
}

const existRedisBoxSupportCollections = async () => {
  return await Redis.exists(getRedisKeyBoxSupportCollections())
}

const deleteRedisBoxSupportCollections = () => {
  let redisKey = getRedisKeyBoxSupportCollections()
  Redis.del(redisKey)
}

/*
  Box collection detail
 */
const getRedisKeyBoxCollectionDetail = (id) => {
  return `box_collection_detail_${id}`
}

const getRedisBoxCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyBoxCollectionDetail(id))
}

const setRedisBoxCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyBoxCollectionDetail(id), JSON.stringify(data))
}

const existRedisBoxCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyBoxCollectionDetail(id))
}

const deleteRedisBoxCollectionDetail = (id) => {
  let redisKey = getRedisKeyBoxCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  Box block number
 */
const getRedisKeyBoxBlockNumber = (event_type) => {
  return `box_block_number_${event_type}`
}

const getRedisBoxBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyBoxBlockNumber(event_type))
}

const setRedisBoxBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyBoxBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisBoxBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyBoxBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyBoxSlug = (token_address) => {
  return `box_slug_${token_address}`
}

const getRedisBoxSlug = async (token_address) => {
  return await Redis.get(getRedisKeyBoxSlug(token_address))
}

const setRedisBoxSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyBoxSlug(token_address), JSON.stringify(slug))
}

const existRedisBoxSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyBoxSlug(token_address))
}

const deleteRedisBoxSlug = (token_address) => {
  let redisKey = getRedisKeyBoxSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisBoxTopCollections,
  setRedisBoxTopCollections,
  existRedisBoxTopCollections,
  deleteRedisBoxTopCollections,

  getRedisBoxSupportCollections,
  setRedisBoxSupportCollections,
  existRedisBoxSupportCollections,
  deleteRedisBoxSupportCollections,

  // collection
  getRedisBoxCollectionDetail,
  setRedisBoxCollectionDetail,
  existRedisBoxCollectionDetail,
  deleteRedisBoxCollectionDetail,

  // marketplace block number
  getRedisBoxBlockNumber,
  setRedisBoxBlockNumber,
  existRedisBoxBlockNumber,

  // marketplace slug
  getRedisKeyBoxSlug,
  getRedisBoxSlug,
  setRedisBoxSlug,
  existRedisBoxSlug,
  deleteRedisBoxSlug,
}
