module.exports = {
  apps: [
    {
      name: 'market',
      script: 'node server.js',
      autorestart: true,
    },
    {
      name: 'market-bull',
      script: 'node ace bull:listen',
      autorestart: true,
    },
  ],
}
