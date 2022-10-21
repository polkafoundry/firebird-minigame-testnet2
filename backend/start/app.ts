const providers = ['@rocketseat/adonis-bull/providers/Bull']

const aliases = {
  Scheduler: 'Adonis/Addons/Scheduler',
}

const commands = [
  'App/Commands/FetchEvents',
  'App/Commands/FetchStakingEvents',
  'App/Commands/RefetchEvents',
  'App/Commands/FetchLFWEvents',
  // 'App/Commands/GetUserKycInformationCommand',
  // 'App/Commands/SignatureCommand',
]

const jobs = ['App/Jobs/ExportUsers', 'App/Jobs/FetchMarketplaceEvent', 'App/Jobs/FetchLFWEventJob']

const aceProviders = ['@rocketseat/adonis-bull/providers/Command']

module.exports = { providers, aceProviders, aliases, commands, jobs }
