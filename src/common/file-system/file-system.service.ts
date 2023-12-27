import { Injectable } from '@nestjs/common';
import { PATH } from '../../constants';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Injectable()
export class FileSystemService {
  saveImage(file: Express.Multer.File): string {
    try {
      if (!fs.existsSync(PATH.IMAGEPATH)) {
        fs.mkdirSync(PATH.IMAGEPATH, { recursive: true });
      }
      const filePath = path.join(PATH.IMAGEPATH, `${uuid()}.${file.originalname}`);

      fs.writeFileSync(filePath, file.buffer);

      return filePath;
    } catch (e) {
      console.log(e);
      throw `Error while saving image: ${e}`;
    }
  }

  deleteImage(filePath: string): boolean {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (e) {
    }
  }
}
