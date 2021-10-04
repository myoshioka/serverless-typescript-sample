import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'

import { requestBody } from './schema'

const hello: ValidatedEventAPIGatewayProxyEvent<typeof requestBody> = async (
  event,
) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    body: event.body,
    env: process.env.ENV,
  })
}

export const main = middyfy(hello)
