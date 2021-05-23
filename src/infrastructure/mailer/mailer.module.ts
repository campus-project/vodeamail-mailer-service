import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST') || '127.0.0.1',
          port: configService.get<number>('MAIL_PORT') || 1025,
          ignoreTLS: false,
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USERNAME') || 'testuser',
            pass: configService.get<string>('MAIL_PASSWORD') || 'testpassword',
          },
        },
      }),
    }),
  ],
})
export class MailerModule {}
