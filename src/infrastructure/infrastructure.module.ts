import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';

const providers: Provider[] = [];

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    MailerModule,
  ],
  providers: [...providers],
  exports: [...providers],
})
export class InfrastructureModule {}
