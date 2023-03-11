import { url } from './../helper';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '@/transform.interceptor';
import { ImageUpload, UploadFile } from './decorator/upload.decorator';

@Controller('upload')
@UseInterceptors(new TransformInterceptor())
export class UploadController {
  @Post('image')
  @ImageUpload()
  image(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Post('document')
  @UploadFile('file', ['image', 'markdown'])
  document(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
