import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ClientModule } from 'src/client/client.module';
import { DatabaseModule } from 'src/database/database.module';
import { ChatController } from './chat.controller';
import { chatProviders } from './chat.providers';
import { ChatService } from './chat.service';

@Module({
  imports: [ClientModule, AuthModule, DatabaseModule],
  controllers: [ChatController],
  providers: [ChatService, ...chatProviders],
  exports: [ChatService]
})
export class ChatModule {}
