import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavourService } from './favour.service';
import { CreateFavourDto, EditFavourDto } from './dtos';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from '../pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationException } from '../exceptions';
import { extname } from 'path';
import { Favour } from './schemas';

@ApiTags('Услуги')
@Controller('favour')
export class FavourController {
  constructor(private favourService: FavourService) {
  }

  @ApiOperation({summary: 'Получение услуги по ID'})
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ObjectID',
  })
  @ApiResponse({
    type: Favour,
    status: 200
  })
  @Get('get/:id')
  async getById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.favourService.getById(id);
  }

  @ApiOperation({summary: 'Получение всех услуг'})
  @ApiResponse({
    type: [Favour],
    status: 200
  })
  @Get('get')
  async get() {
    return this.favourService.getAll();
  }

  @ApiOperation({summary: 'Создание услуги'})
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: Favour,
    status: 200
  })
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fieldSize: 1e7
    },
    fileFilter: (req, file, callback) => {
      if (file.mimetype.startsWith('image/') && /\.(png|jpeg|jpg)$/.test(extname(file.originalname).toLowerCase())) {
        callback(null, true);
      } else {
        callback(new ValidationException('Only image files with extensions .png, .jpeg, and .jpg are allowed.'), false);
      }
    }
  }))
  @Post('create')
  async create(@Body() createDto: CreateFavourDto, @UploadedFile() image: Express.Multer.File) {
    return this.favourService.create(createDto, image);
  }

  @ApiOperation({summary: 'Редактирование услуги'})
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: Favour,
    status: 200
  })
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fieldSize: 1e7
    },
    fileFilter: (req, file, callback) => {
      if (file.mimetype.startsWith('image/') && /\.(png|jpeg|jpg)$/.test(extname(file.originalname).toLowerCase())) {
        callback(null, true);
      } else {
        callback(new ValidationException('Only image files with extensions .png, .jpeg, and .jpg are allowed.'), false);
      }
    }
  }))
  @Put('edit')
  async edit(@Body() editDto: EditFavourDto, @UploadedFile() image: Express.Multer.File) {
    return this.favourService.edit(editDto, image);
  }

  @ApiOperation({summary: 'Удаление услуги по ID'})
  @Delete('delete/:id')
  async deleteById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.favourService.deleteById(id);
  }

  @ApiOperation({summary: 'Удаление всех услуг'})
  @Delete('delete')
  async delete() {
    return this.favourService.delete();
  }
}
