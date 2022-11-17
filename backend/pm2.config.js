module.exports = {
  apps: [
    {
      name: 'PhoenixCupApiStaging',
      script: 'NODE_ENV=testing node ace serve',
      autorestart: true,
    },
    {
      name: 'PhoenixCupBullStaging',
      script: 'NODE_ENV=testing node ace bull:listen',
      autorestart: true,
    },
    {
      name: 'PhoenixCupApiProd',
      script: 'NODE_ENV=production node build/server.js',
      autorestart: true,
    },
    {
      name: 'PhoenixCupBullProd',
      script: 'NODE_ENV=production node build/ace bull:listen',
      autorestart: true,
    },
  ],
}
