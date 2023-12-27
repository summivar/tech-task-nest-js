import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavourDto {
  @ApiProperty({ description: 'Имя услуги', example: 'Имя', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание услуги', example: 'Описание', required: true })
  @IsString()
  description: string;


  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Картинка услуги',
    required: false,
  })
  image: Express.Multer.File;
}