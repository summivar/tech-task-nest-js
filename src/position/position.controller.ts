import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { ParseObjectIdPipe } from '../pipes';
import { ObjectId } from 'mongoose';
import { CreatePositionDto, EditPositionDto } from './dtos';

@ApiTags('Должности')
@Controller('position')
export class PositionController {
  constructor(private positionService: PositionService) {
  }

  @ApiOperation({summary: 'Получение должности по ID'})
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ObjectID',
  })
  @Get('get/:id')
  async getById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.positionService.getById(id);
  }

  @ApiOperation({summary: 'Получение всех должностей'})
  @Get('get')
  async get() {
    return this.positionService.getAll();
  }

  @ApiOperation({summary: 'Создание должности'})
  @Post('create')
  async create(@Body() createDto: CreatePositionDto) {
    return this.positionService.create(createDto);
  }

  @ApiOperation({summary: 'Редактирование должности'})
  @Put('edit')
  async edit(@Body() editDto: EditPositionDto) {
    return this.positionService.edit(editDto);
  }

  @ApiOperation({summary: 'Удаление должности по ID'})
  @Delete('delete/:id')
  async deleteById(@Param('id', new ParseObjectIdPipe()) id: ObjectId) {
    return this.positionService.deleteById(id);
  }

  @ApiOperation({summary: 'Удаление всех должностей'})
  @Delete('delete')
  async delete() {
    return this.positionService.delete();
  }
}
