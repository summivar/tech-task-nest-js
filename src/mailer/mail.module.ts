import { Module } from '@nestjs/common';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
      MailerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: {
            host: configService.get<string>('mailer.smtpHost'),
            auth: {
              user: configService.get<string>('mailer.smtpUser'),
              pass: configService.get<string>('mailer.smtpPass'),
            }
          },
          template: {
            dir: path.join(__dirname, '../../templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true
            }
          }
        }),
        inject: [ConfigService]
      })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
