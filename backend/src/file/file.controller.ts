import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilter } from './helpers/fileFilter.helper';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('user')
  @UseInterceptors(FileInterceptor('file', { fileFilter: FileFilter }))
  uploadUserImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    return {
      fileName: file.originalname,
    };
  }
}
