import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseHealthService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseHealthService.name);

    constructor(private readonly pool: Pool) {}

    async onModuleInit() {
        try {
            await this.pool.query('select 1');
            this.logger.log('✅ Database connected successfully');
        } catch (err) {
            this.logger.error('❌ Database connection failed', err);
            process.exit(1); // fail fast
        }
    }
}
