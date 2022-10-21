export const SALE_STATUS_UNLISTED = 0
export const SALE_STATUS_LISTED = 1

export const MARKET_ID_NOT_LIST = -1
export const NFT_NOT_MINT = 0
export const NFT_MINTED = 1

//----------------STATS--------------
export const THRESHOLD_STATS = {
  HP: 50,
  DEF: 50,
  Dodge: 50,
  ATK: 50,
  Speed: 50,
  Focus: 50,
}
export const STATS = [
  {
    key: 0,
    name: 'HP',
  },
  {
    key: 1,
    name: 'DEF',
  },
  {
    key: 2,
    name: 'Dodge',
  },
  {
    key: 3,
    name: 'ATK',
  },
  {
    key: 4,
    name: 'Speed',
  },
  {
    key: 5,
    name: 'Focus',
  },
]
export const STATS_INDEX = {
  HP: 0,
  DEF: 1,
  Dodge: 2,
  ATK: 3,
  Speed: 4,
  Focus: 5,
}
//----------------End STATS--------------
export const TYPE_BOX = ['common', 'special', 'Silver', 'Gold', 'Diamond', 'Random']

//---------------- TYPE & SUB TYPES -------
export const TYPE_EQUIPMENTS = [
  {
    key: 0,
    name: 'Weapon',
  },
  {
    key: 1,
    name: 'Gear',
  },
  {
    key: 2,
    name: 'Map',
  },
  {
    key: 3,
    name: 'Character',
  },
]

export const SUBTYPE_WEAPON = [
  {
    key: 0,
    name: 'Rifles',
  },
  {
    key: 1,
    name: 'Shotguns',
  },
  {
    key: 2,
    name: 'Sniper',
  },
  {
    key: 3,
    name: 'Rocket Launcher',
  },
  {
    key: 4,
    name: 'Machine Guns',
  },
]

export const SUBTYPE_CHARACTER = [
  {
    key: 0,
    name: 'Human',
  },
  {
    key: 1,
    name: 'Cyborg',
  },
  {
    key: 2,
    name: 'Hybrid',
  },
  {
    key: 3,
    name: 'Robot',
  },
]

export const SUBTYPE_GEAR = [
  {
    key: 0,
    name: 'Augmented Reaction',
  },
  {
    key: 1,
    name: 'Resource Integration',
  },
  {
    key: 2,
    name: 'Bat',
  },
  {
    key: 3,
    name: 'Nano',
  },
  {
    key: 4,
    name: 'Variant',
  },
  {
    key: 5,
    name: 'Predator',
  },
]

export const SUBTYPE_MAP = [
  {
    key: 0,
    name: 'PvE Map',
  },
  {
    key: 1,
    name: 'PvP Map',
  },
]

export const TYPE_RARITY = [
  {
    key: 0,
    name: 'Common',
  },
  {
    key: 1,
    name: 'Rare',
  },
  {
    key: 2,
    name: 'Epic',
  },
  {
    key: 3,
    name: 'Legendary',
  },
]
export const SORT_BY = ['price_asc', 'price_desc', 'index_asc', 'index_desc']
