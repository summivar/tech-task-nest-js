import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Position.name,
        schema: PositionSchema,
      },
    ]),
  ],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {
}
