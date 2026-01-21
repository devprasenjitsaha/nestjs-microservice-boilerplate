import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';

export const createPgPool = (config: ConfigService): Pool => {
    const connectionString = config.getOrThrow<string>('database.url');

    const poolConfig: PoolConfig = {
        connectionString,
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 2_000,
    };

    return new Pool(poolConfig);
};
