import {
  MikroORM
} from '@mikro-orm/core'
import 'reflect-metadata'
import { config as configEnv } from 'dotenv'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import mikroConfig from './mikro-orm.config'
import HelloResolver from './resolvers/hello'
import PostResolver from './resolvers/post'

configEnv()

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)

  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({
      em: orm.em
    })
  })

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started at localhost:4000')
  })
}

main()

process.on('exit', (code) => {
  console.log(`Exiting with code: ${code}`)
})
