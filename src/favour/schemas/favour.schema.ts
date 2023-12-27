import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FavourDocument = Favour & Document;

@Schema({
  timestamps: true
})
export class Favour {
  @ApiProperty({example: 'name', description: 'Имя услуги'})
  @Prop({unique: true, required: true})
  name: string;

  @ApiProperty({example: 'description', description: 'Описание услуги'})
  @Prop({required: true})
  description: string;

  @ApiProperty({example: 'image', description: 'Картинка услуги'})
  @Prop({required: true})
  image: string;
}

export const FavourSchema = SchemaFactory.createForClass(Favour);