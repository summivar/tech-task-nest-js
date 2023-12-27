import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true
})
export class Project {
  @ApiProperty({example: 'name', description: 'Имя проекта'})
  @Prop({unique: true, required: true})
  name: string;

  @ApiProperty({example: 'description', description: 'Описание проекта'})
  @Prop()
  description: string;

  @ApiProperty({example: 'link', description: 'Ссылка проекта'})
  @Prop({unique: true, required: true})
  link: string;

  @ApiProperty({example: 'image', description: 'Картинка проекта'})
  @Prop()
  image: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);