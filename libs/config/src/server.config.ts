import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const serverConfigSchema = z.object({
    PORT: z.coerce.number().default(3000),
    ENABLE_OPEN_API_DOC: z.enum(['true', 'false']).transform((val) => val === 'true'),
    CORS_TRUSTED_ORIGINS: z.string(),
    SERVER_BASE_URL: z.string(),
});

export const serverConfig = registerAs('server', (): ServerConfig => {
    const env = serverConfigSchema.parse(process.env);
    Logger.debug(env);
    return {
        port: Number(env.PORT),
        enableOpenApiDoc: env.ENABLE_OPEN_API_DOC,
        corsTrustedOrigins: env.CORS_TRUSTED_ORIGINS
            ? env.CORS_TRUSTED_ORIGINS.split(',').map((origin) => origin.trim())
            : [],
        serverBaseUrl: env.SERVER_BASE_URL,
    };
});

export type ServerConfig = {
    port: number;
    enableOpenApiDoc: boolean;
    corsTrustedOrigins: string[];
    serverBaseUrl: string;
};
