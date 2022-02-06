import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import fs, { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  getFile(filename: string): StreamableFile {
    const filePath = join(process.cwd(), filename);
    const isFileExists = fs.existsSync(filePath);
    if (!isFileExists)
      throw new HttpException(
        `File ${filename} not found`,
        HttpStatus.NOT_FOUND
      );
    return new StreamableFile(createReadStream(filePath));
  }
}
