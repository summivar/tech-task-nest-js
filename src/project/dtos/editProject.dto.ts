import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class EditProjectDto {
  @ApiProperty({ description: 'ID проекта', example: 'ID', required: true })
  @IsObjectId()
  id: ObjectId;

  @ApiProperty({ description: 'Имя проекта', example: 'Имя', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Описание проекта', example: 'Описание', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Ссылка проекта', example: 'Ссылка' })
  @IsString()
  @IsOptional()
  link: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Картинка проекта',
    required: false,
  })
  image: Express.Multer.File;
}