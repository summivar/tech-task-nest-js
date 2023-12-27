import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavourDto, EditFavourDto } from './dtos';
import { FileSystemService } from '../common/file-system/file-system.service';
import { InjectModel } from '@nestjs/mongoose';
import { Favour } from './schemas';
import { Model, ObjectId } from 'mongoose';
import { EXCEPTION_MESSAGE } from '../constants';

@Injectable()
export class FavourService {
  constructor(
    @InjectModel(Favour.name) private favourModel: Model<Favour>,
    private fileSystem: FileSystemService,
  ) {
  }

  async getById(id: ObjectId) {
    const candidate = await this.favourModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    return candidate;
  }

  async getAll() {
    return this.favourModel.find();
  }

  async create(dto: CreateFavourDto, image: Express.Multer.File) {
    const pathToImage = this.fileSystem.saveImage(image);
    const favour = new this.favourModel({ name: dto.name, description: dto.description, image: pathToImage });
    return favour.save().catch((e) => {
      if (e.toString().includes('E11000')) {
        this.fileSystem.deleteImage(pathToImage);
        throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.ALREADY_EXISTS);
      }
    });
  }

  async edit(editDto: EditFavourDto, image: Express.Multer.File) {
    const existingFavour = await this.favourModel.findById(editDto.id);

    if (!existingFavour) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }

    if (editDto?.name) {
      existingFavour.name = editDto.name;
    }

    if (editDto?.description) {
      existingFavour.description = editDto.description;
    }

    if (editDto?.image?.size) {
      this.fileSystem.deleteImage(existingFavour.image);
      existingFavour.image = this.fileSystem.saveImage(image);
    }

    return existingFavour.save();
  }

  async deleteById(id: ObjectId) {
    const candidate = await this.favourModel.findById(id);
    if (!candidate) {
      throw new BadRequestException(EXCEPTION_MESSAGE.BAD_REQUEST_EXCEPTION.NOT_FOUND_BY_ID);
    }
    this.fileSystem.deleteImage(candidate.image);
    return this.favourModel.deleteOne({ _id: candidate._id });
  }

  async delete() {
    const allFavours = await this.favourModel.find();
    for (const favour of allFavours) {
      this.fileSystem.deleteImage(favour.image);
    }
    return this.favourModel.deleteMany();
  }
}
