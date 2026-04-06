import { Global, Module, OnApplicationShutdown, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { kyselyProvider, KYSELY } from './kysely.provider';
import { DatabaseService } from './database.service';
import { Database } from './types';

@Global()
@Module({
  providers: [DatabaseService, kyselyProvider],
  exports: [DatabaseService, KYSELY],
})
export class KyselyModule implements OnApplicationShutdown {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async onApplicationShutdown() {
    await this.db.destroy();
  }
}
