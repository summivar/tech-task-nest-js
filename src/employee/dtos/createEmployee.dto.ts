import { IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Position } from '../../position/schemas';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Имя работника', example: 'Имя', required: true })
  @IsString()
  name: string;

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