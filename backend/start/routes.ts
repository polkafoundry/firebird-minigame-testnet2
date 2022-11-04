/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', () => "It's workingaaaaa")

Route.group(() => {
  Route.get('/match/get-list-match', 'MatchController.getListMatch')
  Route.get('/match/upcoming', 'MatchController.getUpcomingMatch')
  Route.get('/match/live', 'MatchController.getLiveMatch')
  Route.get('/match/detail/:match_id', 'MatchController.getMatchDetail')

  Route.post('betting/ou-ht-calculate', 'BettingsController.ouHTCalculate')
  Route.post('betting/ou-ft-calculate', 'BettingsController.ouFTCalculate')
  Route.post('betting/odds-ht-calculate', 'BettingsController.oddsHTCalculate')
  Route.post('betting/odds-ft-calculate', 'BettingsController.oddsFTCalculate')
  Route.post('betting/predict-pick-winner', 'BettingsController.predictPickWinner')

  Route.post('/claim/get-sig', 'ClaimController.claimToken')
}).prefix('/api/v1')

Route.group(() => {})
  .prefix('/api/v1')
  .middleware('checkSignature')
