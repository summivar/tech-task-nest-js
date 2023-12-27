import { Module } from '@nestjs/common';
import { FavourController } from './favour.controller';
import { FavourService } from './favour.service';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Favour, FavourSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Favour.name,
        schema: FavourSchema
      }
    ]),
    CommonModule
  ],
  controllers: [FavourController],
  providers: [FavourService]
})
export class FavourModule {}
