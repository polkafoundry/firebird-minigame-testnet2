/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname)
  .httpServer()
  .start()
  .then(() => {
    // console.log(`serving app on http://${process.env.HOST}:${process.env.PORT}`)
    // const sendDataToMetaForceSchedule = require('@ioc:App/Tasks/SendDataToMetaForceTask')
    // sendDataToMetaForceSchedule()

    const recalcBettingTask = require('@ioc:App/Tasks/RecalcBettingTask')
    recalcBettingTask()

    const fetLiveMatchTask = require('@ioc:App/Tasks/FetLiveMatchTask')
    fetLiveMatchTask()

    const fetchDataMonsterraTask = require('@ioc:App/Tasks/FetchDataMonsterraTask')
    fetchDataMonsterraTask()

    const sendBirdToMonsEventTask = require('@ioc:App/Tasks/SendBirdToMonsEventTask')
    sendBirdToMonsEventTask()
  })
