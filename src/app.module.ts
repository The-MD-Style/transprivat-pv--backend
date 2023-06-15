import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm.service';
import { CourseController } from './Modules/course/course.controller';
import { CourseModule } from './Modules/course/course.module';
import { UserModule } from './Modules/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthController } from './Modules/auth/auth.controller';
import { AuthModule } from './Modules/auth/auth.module';
import { UploadController } from './Modules/upload/upload.controller';
import { UploadModule } from './Modules/upload/upload.module';



@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MulterModule.register({ dest: './uploads' }),
    CourseModule,
    UserModule,
    AuthModule,
    UploadModule
  ],
  controllers: [CourseController, AuthController, UploadController],
  providers: [],
  exports:[]
})
export class AppModule {}
