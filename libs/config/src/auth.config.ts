import { registerAs } from '@nestjs/config';

export const betterAuthConfig = registerAs('BETTER_AUTH', () => ({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    ENABLE_EMAIL_VERIFICATION_ON_SIGNUP: process.env.ENABLE_EMAIL_VERIFICATION_ON_SIGNUP === 'true',
    OTP_EXPIRY_TIME: parseInt(process.env.OTP_EXPIRY_TIME || '600', 10), // Default 10 minutes in seconds
    ENABLE_ADVANCED_BETTER_AUTH: process.env.ENABLE_ADVANCED_BETTER_AUTH === 'true',
}));

export type BetterAuthConfig = ReturnType<typeof betterAuthConfig>;
