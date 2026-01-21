import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const createDrizzle = <TSchema extends Record<string, unknown>>(
    pool: Pool,
    schema?: TSchema
): NodePgDatabase<TSchema> => {
    return drizzle(pool, { schema });
};
