import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Имя того, кто отправляет заявку', example: 'Имя', required: true })
  @IsString()
  name: string;

  @IsString()
  @IsPhoneNumber()
  @ApiProperty({ description: 'Телефон того, кто отправляет заявку', example: '+375291234567', required: true })
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Текст заявки', example: 'Текст', required: false })
  text?: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, description: 'Файлы заявки', required: false })
  @IsOptional()
  files: Express.Multer.File[];
}