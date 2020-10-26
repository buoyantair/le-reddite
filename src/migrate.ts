import { MikroORM } from '@mikro-orm/core'
import MikroConfig from './mikro-orm.config'

(async () => {
  const orm = await MikroORM.init(MikroConfig)
  console.log(__dirname)

  const migrator = await orm.getMigrator()
  await migrator.createMigration()
  await migrator.up()

  await orm.close(true)
  console.log('successfully migrated')
  process.exit(0)
})().catch(console.error)
