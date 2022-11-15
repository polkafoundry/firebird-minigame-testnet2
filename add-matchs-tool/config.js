require("dotenv").config();

module.exports = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
  BETTING_CONTRACT_ADDRESS: process.env.BETTING_CONTRACT_ADDRESS,
  BIRD_CONTRACT_ADDRESS: process.env.BIRD_CONTRACT_ADDRESS,
  INC_GAS_PRICE: 5,
  CHAIN_ID: process.env.CHAIN_ID,
  FAUCET_END_POINT: "https://faucet.firefly.firebirdchain.com/api/v1/faucet",
  PKF_FAUCET_TOKEN:
    "03AIIukzjQMcQMxZo6lXh2LKsXdnf9tNoSA6FzFvaNOEpNeWt4y8VvC9efezFM6QtQXKQaI4M9Jd8qO1TBe8Z0ub4863NJQjqRvoBrlCMDiHgOdmPYsQMFHuiV1gLyRtccfk1AwmUvimZK-KfXRfsaJsDo7TLndn4FW2lpc4bKeqCqsDQIy9WOOygAJNFkjV3OtMbZDs1wTonht979NfWBWp1DLv2leAX4Dpf2y7y09WKgtJBSMCSYU7p-kApRxy8s1jHDUnUnNwWrxGJgNWj5Wy2dInOXU2nbsZa4QptOQQpI3XH7FwveNcDVu2ZyG_7JzVfOWhQfs8ngUhsxnNatc8PcQmYxS9S6TgUSfuV7rKqWtaVP4l0O0qXSvD6Cox8Jr_c7FFWfkVjl6tSRIyhJb0Ij3_SrjLxyfhFFcWjMaGMo2d6MdI1jwnKkS_e0JmshiYQfp51Rda4ajrDP04W1dHMLtsI8gJCeQ_07wGruzmWRFeeuS4MPUJdDQPmMddV5p45-_1eX4ERNWWBVIpWaEUlH2BbLZzc0BQ0nXpWQHLRtcZf3wGSE3Yk",
  PKF_FAUCET_SYMBOL: "PKF",
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
};
