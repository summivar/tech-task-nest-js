import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileSystemService } from '../common/file-system/file-system.service';
import { EXCEPTION_MESSAGE } from '../constants';
import { CreateProjectDto, EditProjectDto } from './dtos';
import { Project } from './schemas';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private fileSystem: FileSystemService,
  ) {
  }

  async getById(id: ObjectId) {
    const candidate = await this.projectModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    return candidate;
  }

  async getAll() {
    return this.projectModel.find();
  }

  async create(dto: CreateProjectDto, image: Express.Multer.File) {
    const pathToImage = this.fileSystem.saveImage(image);
    const project = new this.projectModel({ name: dto.name, description: dto.description, link: dto.link, image: pathToImage});
    return project.save().catch((e) => {
      if (e.toString().includes('E11000')) {
        this.fileSystem.deleteImage(pathToImage);
        throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.ALREADY_EXISTS);
      }
    });
  }

  async edit(editDto: EditProjectDto, image: Express.Multer.File) {
    const existingModel = await this.projectModel.findById(editDto.id);

    if (!existingModel) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }

    if (editDto?.name) {
      existingModel.name = editDto.name;
    }

    if (editDto?.description) {
      existingModel.description = editDto.description;
    }

    if (editDto?.link) {
      existingModel.link = editDto.link;
    }

    if (editDto?.image?.size) {
      this.fileSystem.deleteImage(existingModel.image);
      existingModel.image = this.fileSystem.saveImage(image);
    }

    return existingModel.save();
  }

  async deleteById(id: ObjectId) {
    const candidate = await this.projectModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    this.fileSystem.deleteImage(candidate.image);
    return this.projectModel.deleteOne({ _id: candidate._id });
  }

  async delete() {
    const allProjects = await this.projectModel.find();
    for (const project of allProjects) {
      this.fileSystem.deleteImage(project.image);
    }
    return this.projectModel.deleteMany();
  }
}
