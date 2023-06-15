import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Delete, UploadedFile, UseInterceptors, Param, HttpCode, HttpStatus, Get } from '@nestjs/common';

import { UploadService } from './upload.service';
import { CreateFileUploadDto } from './dto/create-uploadFile.dto';


@ApiTags('Upload')
@Controller('upload')
export class UploadController {
   
   constructor(private readonly uploadService: UploadService){}

   @Post('/file')
   @ApiOkResponse({ type: CreateFileUploadDto })
   @HttpCode(HttpStatus.OK)
   @UseInterceptors(FileInterceptor('file', {
      storage:diskStorage({
         destination:'./files',
         filename: (req, file, callback) => {
            const uniqueSuffix = Date.now();
            const ext = extname(file.originalname);
            const filename = `transprivate-pv-${uniqueSuffix}${ext}`;
            callback(null, filename);
         }
      })
   }))
   async UploadFile(@UploadedFile() file: Express.Multer.File){
      return await this.uploadService.create(file.filename);
   }

   @HttpCode(HttpStatus.OK)
   @Delete(':name')
   async DeleteFile(@Param("name") name: string){
      await this.uploadService.delete(name);
   }

   @ApiOkResponse({ type: [CreateFileUploadDto] })
   @HttpCode(HttpStatus.OK)
   @Get()
   async GetFiles(){
      return await this.uploadService.getAll();
   }
}
