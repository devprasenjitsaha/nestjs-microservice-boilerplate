import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseSchema = z.object({
    DATABASE_URL: z.string().url(),
});

export const databaseConfig = registerAs('database', () => {
    const env = databaseSchema.parse(process.env);

    return {
        url: env.DATABASE_URL,
    };
});

export type DatabaseConfig = {
    url: string;
};
