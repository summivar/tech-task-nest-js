import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Position } from './schemas';
import { CreatePositionDto, EditPositionDto } from './dtos';
import { EXCEPTION_MESSAGE } from '../constants';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<Position>,
  ) {
  }

  async getByName(name: string) {
    return this.positionModel.findOne({name: name});
  }

  async getById(id: ObjectId) {
    const candidate = await this.positionModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    return candidate;
  }

  async getAll() {
    return this.positionModel.find();
  }

  async create(dto: CreatePositionDto) {
    const position = new this.positionModel({name: dto.name, description: dto.description});
    return position.save().catch((e) => {
      if (e.toString().includes('E11000')) {
        throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.ALREADY_EXISTS);
      }
    });
  }

  async edit(editDto: EditPositionDto) {
    const { id, name, description } = editDto;

    const updateFields: { [key: string]: any } = {};

    if (name !== undefined) {
      updateFields.name = name;
    }

    if (description !== undefined) {
      updateFields.description = description;
    }

    return this.positionModel.updateOne({_id: id}, { $set: updateFields })
  }

  async deleteById(id: ObjectId) {
    const candidate = await this.positionModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    return this.positionModel.deleteOne({ _id: candidate._id });
  }

  async delete() {
    return this.positionModel.deleteMany();
  }

}
