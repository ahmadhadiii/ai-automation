import { Global, Module, OnApplicationShutdown, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { kyselyProvider, KYSELY } from './kysely.provider';
import { Database } from './database.types';

@Global()
@Module({
  providers: [kyselyProvider],
  exports: [KYSELY],
})
export class KyselyDatabaseModule implements OnApplicationShutdown {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async onApplicationShutdown() {
    await this.db.destroy();
  }
}
