import {
  MikroORM
} from '@mikro-orm/core'
import { config as configEnv } from 'dotenv'

import Post from './entities/Post'
import mikroConfig from './mikro-orm.config'

configEnv()

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)

  const post = orm.em.create(Post, {
    title: 'my first post'
  })
  await orm.em.persistAndFlush(post)

  const posts = await orm.em.find(Post, {})
  console.log(posts)

  // watch this commit go boom
  console.log('data inserted!')
}

main()
