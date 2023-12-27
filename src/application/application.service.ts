import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dtos';
import { MailService } from '../mailer/mail.service';

@Injectable()
export class ApplicationService {
  constructor(private mailService: MailService) {
  }
  async create(createDto: CreateApplicationDto, files: Array<Express.Multer.File>) {
    return this.mailService.sendApplicationMail({
      name: createDto.name,
      phone: createDto.phone,
      text: createDto.text,
      files: files
    });
  }
}
