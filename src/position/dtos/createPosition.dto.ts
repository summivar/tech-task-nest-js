import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({ description: 'Имя должности', example: 'Должность', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание должности', example: 'Описание', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}