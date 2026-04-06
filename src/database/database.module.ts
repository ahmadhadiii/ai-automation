import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { kyselyProvider, KYSELY } from './kysely.provider';

@Global()
@Module({
  providers: [DatabaseService, kyselyProvider],
  exports: [DatabaseService, KYSELY],
})
export class DatabaseModule {}
