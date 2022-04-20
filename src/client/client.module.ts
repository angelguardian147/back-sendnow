import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { DatabaseModule } from 'src/database/database.module';
import { clientProviders } from './client.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ClientController],
  providers: [ClientService, ...clientProviders],
  exports: [ClientService]
})
export class ClientModule {}
