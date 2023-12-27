import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Имя проекта', example: 'Имя', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Описание проекта', example: 'Описание', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Ссылка проекта', example: 'Ссылка' })
  @IsString()
  link: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Картинка проекта',
    required: false,
  })
  image: Express.Multer.File;
}