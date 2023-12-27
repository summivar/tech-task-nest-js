import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class EditPositionDto {
  @ApiProperty({ description: 'ID должности', example: 'ID', required: true })
  @IsObjectId()
  id: ObjectId;

  @ApiProperty({ description: 'Имя должности', example: 'Должность', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Описание должности', example: 'Описание', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}