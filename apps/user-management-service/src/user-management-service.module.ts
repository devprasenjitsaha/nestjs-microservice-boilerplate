import { databaseConfig, serverConfig } from '@app/config';
import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from 'apps/user-management-service/src/user.repository';
import { UserManagementServiceController } from './user-management-service.controller';
import { UserManagementServiceService } from './user-management-service.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/user-management-service/.env',
            load: [databaseConfig, serverConfig],
        }),
        DatabaseModule,
    ],
    controllers: [UserManagementServiceController],
    providers: [UserManagementServiceService, UserRepository],
})
export class UserManagementServiceModule {}
