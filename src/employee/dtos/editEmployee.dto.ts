import { IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Position } from '../../position/schemas';
import { ObjectId } from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class EditEmployeeDto {
  @ApiProperty({ description: 'ID работник', example: 'ID', required: true })
  @IsObjectId()
  id: ObjectId;

  @ApiProperty({ description: 'Имя работника', example: 'Имя', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Отчество работника', example: 'Отчество', required: false })
  @IsString()
  @IsOptional()
  patronymic?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Фото работника',
    required: false,
  })
  photo: Express.Multer.File;

  @ApiProperty({
    type: Position,
    example: { name: 'position-name', description: 'position-description' },
    description: 'Должность работника',
    required: false,
  })
  @IsObject()
  @IsOptional()
  position?: Position;
}