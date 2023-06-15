import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploadFileEntity } from './entity/upload.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    imports: [TypeOrmModule.forFeature([UploadFileEntity])],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService],
})
export class UploadModule {}
