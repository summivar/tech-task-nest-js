import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../pipes';
import { ObjectId } from 'mongoose';
import { EmployeeService } from './employee.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ValidationException } from '../exceptions';
import { CreateEmployeeDto, EditEmployeeDto } from './dtos';

@ApiTags('Работники')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {
  }

  @ApiOperation({summary: 'Получение работника по ID'})
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ObjectID',
  })
  @Get('get/:id')
  async getById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.employeeService.getById(id);
  }

  @ApiOperation({summary: 'Получение всех работников'})
  @Get('get')
  async get() {
    return this.employeeService.getAll();
  }

  @ApiOperation({summary: 'Создание работника'})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo', {
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
  async create(@Body() createDto: CreateEmployeeDto, @UploadedFile() photo: Express.Multer.File) {
    return this.employeeService.create(createDto, photo);
  }

  @ApiOperation({summary: 'Редактирование работника'})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo', {
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
  async edit(@Body() editDto: EditEmployeeDto, @UploadedFile() photo: Express.Multer.File) {
    return this.employeeService.edit(editDto, photo);
  }

  @ApiOperation({summary: 'Удаление работника по ID'})
  @Delete('delete/:id')
  async deleteById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.employeeService.deleteById(id);
  }

  @ApiOperation({summary: 'Удаление всех рабоников'})
  @Delete('delete')
  async delete() {
    return this.employeeService.delete();
  }
}
