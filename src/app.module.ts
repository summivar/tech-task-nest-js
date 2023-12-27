import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { FavourModule } from './favour/favour.module';
import { PositionModule } from './position/position.module';
import { ProjectModule } from './project/project.module';
import { CommonModule } from './common/common.module';
import { EmployeeModule } from './employee/employee.module';
import { ApplicationModule } from './application/application.module';
import { MailModule } from './mailer/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.URL'),
      }),
      inject: [ConfigService],
    }),
    FavourModule,
    PositionModule,
    ProjectModule,
    CommonModule,
    EmployeeModule,
    MailModule,
    ApplicationModule,
  ],
})
export class AppModule {
}
