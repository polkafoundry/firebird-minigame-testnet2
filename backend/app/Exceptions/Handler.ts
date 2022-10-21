/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    // Custom handlers
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      ctx.response.status(404).send({
        status: 404,
        code: 'route.not.found',
        message: 'Can not find route ',
      })
    } else if (error.sql) {
      ctx.response.status(500).send({
        status: 500,
        code: 'internal.server.error',
        message: 'Internal server error',
      })
    } else if (error instanceof SyntaxError) {
      ctx.response.status(400).send({
        status: 400,
        code: 'invalid.param',
        message: 'Syntax Error',
      })
    } else {
      await super.handle(error, ctx)
    }
  }
}
