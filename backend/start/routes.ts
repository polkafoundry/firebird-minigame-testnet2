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

Route.get('/', () => "It's working")

Route.group(() => {
  Route.get('/match/get-list-match', 'MatchController.getListMatch')
  Route.get('/match/upcoming', 'MatchController.getUpcomingMatch')
  Route.get('/match/live', 'MatchController.getLiveMatch')
  Route.get('/match/detail/:match_id', 'MatchController.getMatchDetail')
  Route.post('/match/re-calc-match/:match_id', 'MatchController.recalcMatch').middleware(
    'checkAuthSignature'
  )

  Route.post('betting/ou-ht-calculate', 'BettingsController.ouHTCalculate')
  Route.post('betting/ou-ft-calculate', 'BettingsController.ouFTCalculate')
  Route.post('betting/odds-ht-calculate', 'BettingsController.oddsHTCalculate')
  Route.post('betting/odds-ft-calculate', 'BettingsController.oddsFTCalculate')
  Route.post('betting/history', 'BettingsController.getUserBettingHistory')

  Route.post('/claim/get-sig', 'ClaimController.claimToken')

  Route.post('/predict/get-match-predict-info', 'PredictWinnerController.checkPredictByMatch')

  Route.post('/predict/get-predict-history', 'PredictWinnerController.getUserPredictHistory')

  Route.get('/predict/predict-winner-in-match', 'PredictWinnerController.getListPredictWinner')
  Route.get('/predict/predict-winner-count-by-match', 'PredictWinnerController.predictCountByMatch')
  Route.post('/predict/history', 'PredictWinnerController.getUserPredictHistory')
  Route.post('/predict/update-status', 'PredictWinnerController.updatePredictStatus')

  Route.get('/leaderboard', 'MetaForceController.getData')

  Route.post('/user/log-error', 'UserLogsController.saveLogs')
}).prefix('/api/v1')

Route.group(() => {})
  .prefix('/api/v1')
  .middleware('checkSignature')
