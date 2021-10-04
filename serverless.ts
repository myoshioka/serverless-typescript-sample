import type { AWS } from '@serverless/typescript'

import hello from '@functions/hello'

const serverlessConfiguration: AWS = {
  service: 'serverless-typescript-sample',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    defaultStage: 'dev',
    environment: {
      dev: '${file(./env/dev.yml)}',
      stg: '${file(./env/stg.yml)}',
      prod: '${file(./env/prod.yml)}',
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${opt:stage, self:custom.defaultStage}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ENV: '${self:custom.environment.${self:provider.stage}.ENV}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello },
}

module.exports = serverlessConfiguration
