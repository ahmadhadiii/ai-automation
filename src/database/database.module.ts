import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { kyselyProvider, KYSELY } from './kysely.provider';

@Global()
@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, kyselyProvider],
  exports: [DatabaseService, KYSELY],
})
export class DatabaseModule {}
