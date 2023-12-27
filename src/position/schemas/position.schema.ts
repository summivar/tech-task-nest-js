import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PositionDocument = Position & Document;

@Schema({
  timestamps: true
})
export class Position {
  @ApiProperty({example: 'name', description: 'Имя должности'})
  @Prop({unique: true, required: true})
  name: string;

  @ApiProperty({example: 'description', description: 'Описание должности'})
  @Prop()
  description: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);