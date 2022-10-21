'use strict'

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

import Env from '@ioc:Adonis/Core/Env'
import { RedisConfig } from '@ioc:Adonis/Addons/Redis'


const redisConfig: RedisConfig = {
  connection: Env.get('REDIS_CONNECTION', 'local') as 'local',

  connections: {
    /*
    |--------------------------------------------------------------------------
    | The default connection
    |--------------------------------------------------------------------------
    |
    | The main connection you want to use to execute redis commands. The same
    | connection will be used by the session provider, if you rely on the
    | redis driver.
    |
    */
    local: {
      host: Env.get('REDIS_HOST', '127.0.0.1') as string,
      port: Env.get('REDIS_PORT', '6379') as string,
      password: Env.get('REDIS_PASSWORD', '') as string,
      db: Env.get('REDIS_DB', 0) as number,
      keyPrefix: '',
    },
  },
}

export default redisConfig
