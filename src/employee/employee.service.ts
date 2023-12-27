import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileSystemService } from '../common/file-system/file-system.service';
import { EXCEPTION_MESSAGE } from '../constants';
import { CreateEmployeeDto, EditEmployeeDto } from './dtos';
import { Employee } from './schemas';
import { PositionService } from '../position/position.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private fileSystem: FileSystemService,
    private positionService: PositionService,
  ) {
  }

  async getById(id: ObjectId) {
    const candidate = await this.employeeModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    return candidate;
  }

  async getAll() {
    return this.employeeModel.find();
  }

  async create(dto: CreateEmployeeDto, photo: Express.Multer.File) {
    const pathToImage = this.fileSystem.saveImage(photo);
    const employee = new this.employeeModel({
      name: dto.name,
      patronymic: dto.patronymic,
      photo: dto.photo,
      position: dto.position,
    });
    await this.positionService.create(dto.position);
    employee.save().catch((e) => {
      if (e.toString().includes('E11000')) {
        this.fileSystem.deleteImage(pathToImage);
        throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.ALREADY_EXISTS);
      }
    });
  }

  async edit(editDto: EditEmployeeDto, photo: Express.Multer.File) {
    const existingEmployee = await this.employeeModel.findById(editDto.id);

    if (!existingEmployee) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }

    if (editDto?.name) {
      existingEmployee.name = editDto.name;
    }

    if (editDto?.patronymic) {
      existingEmployee.patronymic = editDto.patronymic;
    }

    if (editDto?.position) {
      const position = await this.positionService.getByName(existingEmployee.position.name);
      existingEmployee.position = editDto.position;
      if (editDto?.position.name) {
        position.name = editDto.position.name;
      }
      if (editDto?.position.description) {
        position.description = editDto.position.description;
      }
      await position.save();
    }

    if (editDto?.photo?.size) {
      this.fileSystem.deleteImage(existingEmployee.photo);
      existingEmployee.photo = this.fileSystem.saveImage(photo);
    }

    return existingEmployee.save();
  }

  async deleteById(id: ObjectId) {
    const candidate = await this.employeeModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    this.fileSystem.deleteImage(candidate.photo);
    return this.employeeModel.deleteOne({ _id: candidate._id });
  }

  async delete() {
    const allEmployers = await this.employeeModel.find();
    for (const employee of allEmployers) {
      this.fileSystem.deleteImage(employee.photo);
    }
    return this.employeeModel.deleteMany();
  }
}
