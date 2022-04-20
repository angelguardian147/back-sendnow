import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ ClientModule, AuthModule, UserModule, ChatModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
