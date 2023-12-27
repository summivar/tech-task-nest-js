import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class EditFavourDto {
  @ApiProperty({ description: 'ID услуги', example: 'ID', required: true })
  @IsObjectId()
  id: ObjectId;

  @ApiProperty({ description: 'Имя услуги', example: 'Имя', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Описание услуги', example: 'Описание', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Картинка услуги',
    required: false
  })
  @IsOptional()
  image?: Express.Multer.File;
}