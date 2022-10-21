declare module '@ioc:EpicWar/MarketplaceService' {
  import MarketplaceServiceInterface from 'Contracts/interfaces/MarketplaceService.interface'
  const MarketplaceService: MarketplaceServiceInterface
  export default MarketplaceService
}

declare module '@ioc:EpicWar/MyAccountService' {
  import MyAccountServiceInterface from 'Contracts/interfaces/MyAccountService.interface'
  const MyAccountService: MyAccountServiceInterface<any>
  export default MyAccountService
}

declare module '@ioc:EpicWar/MarketplaceEventsJobService' {
  import MarketplaceEventsJobServiceInterface from 'Contracts/interfaces/MarketplaceEventsJobService.interface'
  const MarketplaceEventsJobService: MarketplaceEventsJobServiceInterface
  export default MarketplaceEventsJobService
}

declare module '@ioc:EpicWar/BoxService' {
  import BoxServiceInterface from 'Contracts/interfaces/BoxService.interface'
  const BoxService: BoxServiceInterface
  export default BoxService
}


declare module '@ioc:EpicWar/AuthService' {
  import AuthServiceInterface from 'Contracts/interfaces/AuthService.interface'
  const AuthService: AuthServiceInterface
  export default AuthService
}
