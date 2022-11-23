import Redis from '@ioc:Adonis/Addons/Redis'

/*
  PickWinner top collections
 */
const getRedisKeyPickWinnerTopCollections = () => {
  return `pick_winner_top_collections`
}

const getRedisPickWinnerTopCollections = async () => {
  return await Redis.get(getRedisKeyPickWinnerTopCollections())
}

const setRedisPickWinnerTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPickWinnerTopCollections(), JSON.stringify(data))
}

const existRedisPickWinnerTopCollections = async () => {
  return await Redis.exists(getRedisKeyPickWinnerTopCollections())
}

const deleteRedisPickWinnerTopCollections = () => {
  let redisKey = getRedisKeyPickWinnerTopCollections()
  Redis.del(redisKey)
}

/*
  PickWinner collections
 */
const getRedisKeyPickWinnerSupportCollections = () => {
  return `pick_winner_support_collections`
}

const getRedisPickWinnerSupportCollections = async () => {
  return await Redis.get(getRedisKeyPickWinnerSupportCollections())
}

const setRedisPickWinnerSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyPickWinnerSupportCollections(), JSON.stringify(data))
}

const existRedisPickWinnerSupportCollections = async () => {
  return await Redis.exists(getRedisKeyPickWinnerSupportCollections())
}

const deleteRedisPickWinnerSupportCollections = () => {
  let redisKey = getRedisKeyPickWinnerSupportCollections()
  Redis.del(redisKey)
}

/*
  PickWinner collection detail
 */
const getRedisKeyPickWinnerCollectionDetail = (id) => {
  return `pick_winner_collection_detail_${id}`
}

const getRedisPickWinnerCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyPickWinnerCollectionDetail(id))
}

const setRedisPickWinnerCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyPickWinnerCollectionDetail(id), JSON.stringify(data))
}

const existRedisPickWinnerCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyPickWinnerCollectionDetail(id))
}

const deleteRedisPickWinnerCollectionDetail = (id) => {
  let redisKey = getRedisKeyPickWinnerCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  PickWinner block number
 */
const getRedisKeyPickWinnerBlockNumber = (event_type) => {
  return `pick_winner_block_number_${event_type}`
}

const getRedisPickWinnerBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyPickWinnerBlockNumber(event_type))
}

const setRedisPickWinnerBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyPickWinnerBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisPickWinnerBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyPickWinnerBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyPickWinnerSlug = (token_address) => {
  return `pick_winner_slug_${token_address}`
}

const getRedisPickWinnerSlug = async (token_address) => {
  return await Redis.get(getRedisKeyPickWinnerSlug(token_address))
}

const setRedisPickWinnerSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyPickWinnerSlug(token_address), JSON.stringify(slug))
}

const existRedisPickWinnerSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyPickWinnerSlug(token_address))
}

const deleteRedisPickWinnerSlug = (token_address) => {
  let redisKey = getRedisKeyPickWinnerSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisPickWinnerTopCollections,
  setRedisPickWinnerTopCollections,
  existRedisPickWinnerTopCollections,
  deleteRedisPickWinnerTopCollections,

  getRedisPickWinnerSupportCollections,
  setRedisPickWinnerSupportCollections,
  existRedisPickWinnerSupportCollections,
  deleteRedisPickWinnerSupportCollections,

  // collection
  getRedisPickWinnerCollectionDetail,
  setRedisPickWinnerCollectionDetail,
  existRedisPickWinnerCollectionDetail,
  deleteRedisPickWinnerCollectionDetail,

  // marketplace block number
  getRedisPickWinnerBlockNumber,
  setRedisPickWinnerBlockNumber,
  existRedisPickWinnerBlockNumber,

  // marketplace slug
  getRedisKeyPickWinnerSlug,
  getRedisPickWinnerSlug,
  setRedisPickWinnerSlug,
  existRedisPickWinnerSlug,
  deleteRedisPickWinnerSlug,
}
