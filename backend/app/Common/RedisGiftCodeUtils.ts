import Redis from '@ioc:Adonis/Addons/Redis'

/*
  GiftCode top collections
 */
const getRedisKeyGiftCodeTopCollections = () => {
  return `gift_code_top_collections`
}

const getRedisGiftCodeTopCollections = async () => {
  return await Redis.get(getRedisKeyGiftCodeTopCollections())
}

const setRedisGiftCodeTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyGiftCodeTopCollections(), JSON.stringify(data))
}

const existRedisGiftCodeTopCollections = async () => {
  return await Redis.exists(getRedisKeyGiftCodeTopCollections())
}

const deleteRedisGiftCodeTopCollections = () => {
  let redisKey = getRedisKeyGiftCodeTopCollections()
  Redis.del(redisKey)
}

/*
  GiftCode collections
 */
const getRedisKeyGiftCodeSupportCollections = () => {
  return `gift_code_support_collections`
}

const getRedisGiftCodeSupportCollections = async () => {
  return await Redis.get(getRedisKeyGiftCodeSupportCollections())
}

const setRedisGiftCodeSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyGiftCodeSupportCollections(), JSON.stringify(data))
}

const existRedisGiftCodeSupportCollections = async () => {
  return await Redis.exists(getRedisKeyGiftCodeSupportCollections())
}

const deleteRedisGiftCodeSupportCollections = () => {
  let redisKey = getRedisKeyGiftCodeSupportCollections()
  Redis.del(redisKey)
}

/*
  GiftCode collection detail
 */
const getRedisKeyGiftCodeCollectionDetail = (id) => {
  return `gift_code_collection_detail_${id}`
}

const getRedisGiftCodeCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyGiftCodeCollectionDetail(id))
}

const setRedisGiftCodeCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyGiftCodeCollectionDetail(id), JSON.stringify(data))
}

const existRedisGiftCodeCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyGiftCodeCollectionDetail(id))
}

const deleteRedisGiftCodeCollectionDetail = (id) => {
  let redisKey = getRedisKeyGiftCodeCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  GiftCode block number
 */
const getRedisKeyGiftCodeBlockNumber = (event_type) => {
  return `gift_code_block_number_${event_type}`
}

const getRedisGiftCodeBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyGiftCodeBlockNumber(event_type))
}

const setRedisGiftCodeBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyGiftCodeBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisGiftCodeBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyGiftCodeBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyGiftCodeSlug = (token_address) => {
  return `gift_code_slug_${token_address}`
}

const getRedisGiftCodeSlug = async (token_address) => {
  return await Redis.get(getRedisKeyGiftCodeSlug(token_address))
}

const setRedisGiftCodeSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyGiftCodeSlug(token_address), JSON.stringify(slug))
}

const existRedisGiftCodeSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyGiftCodeSlug(token_address))
}

const deleteRedisGiftCodeSlug = (token_address) => {
  let redisKey = getRedisKeyGiftCodeSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisGiftCodeTopCollections,
  setRedisGiftCodeTopCollections,
  existRedisGiftCodeTopCollections,
  deleteRedisGiftCodeTopCollections,

  getRedisGiftCodeSupportCollections,
  setRedisGiftCodeSupportCollections,
  existRedisGiftCodeSupportCollections,
  deleteRedisGiftCodeSupportCollections,

  // collection
  getRedisGiftCodeCollectionDetail,
  setRedisGiftCodeCollectionDetail,
  existRedisGiftCodeCollectionDetail,
  deleteRedisGiftCodeCollectionDetail,

  // marketplace block number
  getRedisGiftCodeBlockNumber,
  setRedisGiftCodeBlockNumber,
  existRedisGiftCodeBlockNumber,

  // marketplace slug
  getRedisKeyGiftCodeSlug,
  getRedisGiftCodeSlug,
  setRedisGiftCodeSlug,
  existRedisGiftCodeSlug,
  deleteRedisGiftCodeSlug,
}
