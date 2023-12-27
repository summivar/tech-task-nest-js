import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ValidationException } from '../exceptions';
import { extname } from 'path';

@ApiTags('Заявки')
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {
  }

  @ApiOperation({summary: 'Создание заявки'})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 3, {
    limits: {
      files: 3,
      fileSize: 1e7
    },
    fileFilter: (req, file, callback) => {
      const allowedExtensions = ['.pdf', '.docx'];
      const isValidExtension = allowedExtensions.includes(extname(file.originalname).toLowerCase());

      if (isValidExtension) {
        callback(null, true);
      } else {
        callback(new ValidationException('Неверный формат файла. Поддерживаются только .pdf и .docx'), false);
      }
    },
  }))
  @Post()
  async create(@Body() createDto: CreateApplicationDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.applicationService.create(createDto, files);
  }
}
