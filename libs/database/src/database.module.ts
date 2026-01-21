import { DatabaseHealthService } from '@app/database/database.health';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { createPgPool } from './postgres.pool';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: Pool,
            useFactory: (config: ConfigService) => {
                return createPgPool(config);
            },
            inject: [ConfigService],
        },
        DatabaseHealthService,
    ],
    exports: [Pool],
})
export class DatabaseModule {}
