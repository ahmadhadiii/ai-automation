import { OnModuleDestroy } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from './types';
export declare class DatabaseService extends Kysely<Database> implements OnModuleDestroy {
    constructor();
    onModuleDestroy(): Promise<void>;
}
