import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Param, Post, Delete, Get, Patch } from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entity/course.entity';
import { CourseService } from './course.service';

@ApiTags("course")
@Controller('course')
export class CourseController {

constructor(private readonly courseService: CourseService) {}

  @ApiOkResponse({ type: CreateCourseDto })
  @ApiBody({ type: CreateCourseDto })
  @HttpCode(HttpStatus.OK)
  @Post("/create")
  public async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return this.courseService.create(createCourseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async deleteCourse(@Param("id") id: string): Promise<void> {
    await this.courseService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CreateCourseDto })
  @ApiBody({ type: UpdateCourseDto })
  @Patch("update/:id")
  public async update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<CourseEntity> {
    return await this.courseService.update(id, updateCourseDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CreateCourseDto })
  @Get(":id")
  public async getById(@Param("id") id: string): Promise<CourseEntity | null> {
    return this.courseService.getById(id);
  }

  @ApiOkResponse({ type: [CreateCourseDto] })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAll(): Promise<CourseEntity[]> {
    return this.courseService.getAll();
  }
}
