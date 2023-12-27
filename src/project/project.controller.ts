import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../pipes';
import { ObjectId } from 'mongoose';
import { CreateProjectDto, EditProjectDto } from './dtos';
import { ProjectService } from './project.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ValidationException } from '../exceptions';

@ApiTags('Проекты')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {
  }

  @ApiOperation({summary: 'Получение проекта по ID'})
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ObjectID',
  })
  @Get('get/:id')
  async getById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.projectService.getById(id);
  }

  @ApiOperation({summary: 'Получение всех проектов'})
  @Get('get')
  async get() {
    return this.projectService.getAll();
  }

  @ApiOperation({summary: 'Создание проекта'})
  @ApiConsumes('multipart/form-data')
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
  async create(@Body() createDto: CreateProjectDto, @UploadedFile() image: Express.Multer.File) {
    return this.projectService.create(createDto, image);
  }

  @ApiOperation({summary: 'Редактирование проекта'})
  @ApiConsumes('multipart/form-data')
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
  async edit(@Body() editDto: EditProjectDto, @UploadedFile() image: Express.Multer.File) {
    return this.projectService.edit(editDto, image);
  }

  @ApiOperation({summary: 'Удаление проекта по ID'})
  @Delete('delete/:id')
  async deleteById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.projectService.deleteById(id);
  }

  @ApiOperation({summary: 'Удаление всех проектов'})
  @Delete('delete')
  async delete() {
    return this.projectService.delete();
  }
}
