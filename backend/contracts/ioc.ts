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

declare module '@ioc:Firebird/ClaimService' {
  import ClaimServiceInterface from 'Contracts/interfaces/ClaimService.interface'
  const ClaimService: ClaimServiceInterface
  export default ClaimService
}

declare module '@ioc:Firebird/PredictWinnerService' {
  import PredictWinnerServiceInterface from 'Contracts/interfaces/PredictWinnerService.interface'
  const PredictWinnerService: PredictWinnerServiceInterface
  export default PredictWinnerService
}

declare module '@ioc:Firebird/UserLogsService' {
  import UserLogsServiceInterface from 'Contracts/interfaces/UserLogsService.interface'
  const UserLogsService: UserLogsServiceInterface
  export default UserLogsService
}

declare module '@ioc:Firebird/GiftCodeService' {
  import GiftCodeServiceInterface from 'Contracts/interfaces/GiftCodeService.interface'
  const GiftCodeService: GiftCodeServiceInterface
  export default GiftCodeService
}
