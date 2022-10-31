declare module '@ioc:Firebird/MatchService' {
  import MatchServiceInterface from 'Contracts/interfaces/MatchService.interface'
  const MatchService: MatchServiceInterface
  export default MatchService
}

declare module '@ioc:Firebird/BettingService' {
  import BettingServiceInterface from 'Contracts/interfaces/BettingService.interface'
  const BettingService: BettingServiceInterface
  export default BettingService
}
