/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

// import { fetchUpcomingMatchJob } from 'App/Jobs/FetchUpcomingMatchJob'
// import { fetchLiveMatchJob } from 'App/Jobs/FetchLiveMatchJob'

// import { calcOuFtJob } from 'App/Jobs/CalcOuFtJob'
// import { calcOuHtJob } from 'App/Jobs/CalcOuHtJob'
// import { calcOddsHtJob } from 'App/Jobs/CalcOddsHtJob'
// import { calcOddsFtJob } from 'App/Jobs/CalcOddsFtJob'
// const FetchMatchInfoInitTask = require('@ioc:App/Tasks/FetchMatchInfoTask')
const FetchPredictWinnerInitTask = require('@ioc:App/Tasks/FetchPredictWinnerTask')

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  checkSignature: () => import('App/Middleware/CheckSignature'),
})

//const Scheduler = require('@ioc:Adonis/Addons/Scheduler')

new Promise(() => {
  // Scheduler.run();
  // fetchUpcomingMatchJob({})
  // fetchLiveMatchJob()
  // FetchMatchInfoInitTask.initTask()
  FetchPredictWinnerInitTask.initTask()
  // calcOuFtJob()
  // calcOuHtJob()
  // calcOddsHtJob()
  // calcOddsFtJob()
  return
}).then(() => {})
