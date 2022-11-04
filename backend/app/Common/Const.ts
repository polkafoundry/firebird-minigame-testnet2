module.exports = Object.freeze({
  FILE_SITE: '2mb',
  FILE_EXT: ['png', 'gif', 'jpg', 'jpeg', 'JPEG'],

  ACCEPT_CURRENCY: {
    ETH: 'eth',
    BNB: 'bnb',
    POLYGON: 'matic',
    USDT: 'usdt',
    USDC: 'usdc',
    BUSD: 'busd',
  },
  NETWORK_AVAILABLE: {
    ETH: 'eth',
    BSC: 'bsc',
    POLYGON: 'polygon',
  },
  TOKEN_TYPE: {
    ERC20: 'erc20',
    ERC721: 'erc721',
    MYSTERY_BOX: 'box',
  },
  WEB3_API_URL: 'https://rpc.testnet-firebird.polkafoundry.com/',
  WEB3_BSC_API_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  WEB3_POLYGON_API_URL: 'https://rpc.testnet-firebird.polkafoundry.com',
  OFFER_STATUS: {
    OFFERING: 'OFFERING',
    ACCEPTED: 'ACCEPTED',
    CANCELED: 'CANCELED',
  },

  MARKET_ITEM_STATUS: {
    OPENING: 'OPENING',
    ENDED: 'ENDED',
    CANCELED: 'CANCELED',
  },
  ADDRESS_ZERO: '0x0000000000000000000000000000000000000000',
  NFT_EVENTS: {
    NFT_CREATED: 'NFTCreated',
    NFT_BANNED: 'BanNft',
    NFT_UBBANNED: 'UnbanNft',
    NFT_TRANSFER: 'Transfer',
  },
  MARKETPLACE_EVENTS: {
    EVENT_TYPE_LISTED: 'TokenListed',
    EVENT_TYPE_DELISTED: 'TokenDelisted',
    EVENT_TYPE_BOUGHT: 'TokenBought',
    EVENT_TYPE_OFFERED: 'TokenOffered',
    EVENT_TYPE_CANCEL_OFFERED: 'TokenOfferCanceled',
    EVENT_TYPE_OFFER_TAKEN: 'TokenOfferTaken',
    EVENT_TYPE_MARKET_EDIT: 'MarketItemEdited',
  },
  GAME_SWAP_EVENTS: {
    NFT_DEPOSITED: 'NFTDeposited',
    NFT_WITHDRAWED: 'NFTWithdrawed',
    TOKEN_DEPOSITED: 'TokenDeposited',
    TOKEN_WITHDRAWED: 'TokenWithdrawed',
  },
  GAME_ENDPOINT_HEADERS: {
    'Content-Type': 'application/json',
    'token': `Bearer ${process.env.GAME_ACCESS_TOKEN}`,
  },
  TRANSACTION_STATUS: {
    PENDING: 'pending',
    REJECTED: 'rejected',
    SUCCESS: 'success',
    FAIL: 'fail',
    OVERDUE: 'overdue',
  },
  LINK_INGAME_WALLET_STATUS: {
    OK: 'ok',
    NOT_HAVE_GAME_ACCOUNT: 'not_have_game_account',
    ADDRESS_IN_USED: 'address_in_used',
    ALREADY_LINKED_TO_OTHER_ADDRESS: 'already_linked_to_other_address',
  },
  REDIS_KEY_WITHDRAW_NFT_LAST_SUCCESS: 'epic_last_success_withdraw_nft',
  REDIS_KEY_WITHDRAW_TOKEN_LAST_SUCCESS: 'epic_last_success_withdraw_token',
  REDIS_KEY_REFUND_NFT_LAST_SUCCESS: 'epic_last_success_refund_nft',
  REDIS_KEY_REFUND_TOKEN_LAST_SUCCESS: 'epic_last_success_refund_token',
  SBIRD_CONTRACT_ADDERSS: process.env.SBIRD_CONTRACT_ADDERSS,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PROXY_LIST: process.env.PROXY_LIST ? JSON.parse(process.env.PROXY_LIST) : [],
  BET_TYPE: {
    OU_HT: 'ou_ht',
    ODDS_HT: 'odds_ht',
    OU_FT: 'ou_ft',
    ODDS_FT: 'odds_ft'
  },
  MATCH_STATUS: {
    UPCOMING: 'upcoming',
    LIVE: 'live',
    FINISHED: 'finished',
    POSTPONED: 'postponed'
  }
})
