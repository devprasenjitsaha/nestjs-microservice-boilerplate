import { type ServerConfig } from '@app/config/server.config';
import { ErrorCode, ErrorCodeMessage } from '@app/shared';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserManagementServiceModule } from './user-management-service.module';

async function bootstrap() {
    const app = await NestFactory.create(UserManagementServiceModule);

    const configService = app.get(ConfigService);

    const trustedOrigins = configService.getOrThrow<ServerConfig['corsTrustedOrigins']>('server.corsTrustedOrigins');
    const port = configService.getOrThrow<ServerConfig['port']>('server.port');

    app.enableCors({
        origin: trustedOrigins && trustedOrigins.length > 0 ? trustedOrigins : true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'X-business-id'],
        exposedHeaders: ['Set-Cookie'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'api/ums/v',
        defaultVersion: '1',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: false,
            enableDebugMessages: true,
            stopAtFirstError: true,
            exceptionFactory: (validationErrors) => {
                const message = validationErrors[0].constraints
                    ? Object.values(validationErrors[0].constraints)[0]
                    : ErrorCodeMessage[ErrorCode.UNKNOWN_ERROR];
                return new BadRequestException(message);
            },
        })
    );

    if (process.env.ENABLE_OPEN_API_DOC === 'true') {
        const config = new DocumentBuilder()
            .setTitle('API Documentation')
            .setDescription('The API description')
            .setVersion('1.0')
            .addCookieAuth('authCookie', {
                type: 'http',
                in: 'Header',
                scheme: 'Bearer',
            })
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }

    app.enableShutdownHooks();

    await app.listen(port ?? 3000);
}
void bootstrap();
