import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Position, PositionSchema } from '../../position/schemas';

export type EmployeeDocument = Employee & Document;

@Schema({
  timestamps: true,
})
export class Employee {
  @ApiProperty({ example: 'name', description: 'Имя работника', required: true })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'patronymic', description: 'Отчество работника' })
  @Prop()
  patronymic: string;

  @ApiProperty({ example: 'photo', description: 'Фото работника' })
  @Prop()
  photo: string;

  @ApiProperty({
    type: Position,
    example: { name: 'position-name', description: 'position-description' },
    description: 'Должность работника',
  })
  @Prop({ type: PositionSchema })
  position: Position;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
