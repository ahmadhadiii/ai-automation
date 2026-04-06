import { OnApplicationShutdown } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from './database.types';
export declare class KyselyDatabaseModule implements OnApplicationShutdown {
    private readonly db;
    constructor(db: Kysely<Database>);
    onApplicationShutdown(): Promise<void>;
}
