// apps/user-service/src/user.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './database/user.schema';

@Injectable()
export class UserRepository {
    private readonly db;

    constructor(@Inject(Pool) pool: Pool) {
        this.db = drizzle(pool, { schema });
    }

    findByEmail(email: string) {
        return this.db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });
    }
}
