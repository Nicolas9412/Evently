import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('user')
  @UseInterceptors(FileInterceptor('file'))
  uploadUserImage(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
