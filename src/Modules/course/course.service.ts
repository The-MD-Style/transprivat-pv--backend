import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { SectionDataService } from './services/sectionData.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { StatusService } from './services/status.service';
import { TableService } from './services/table.service';
import { CourseEntity } from './entity/course.entity';
import { CardService } from './services/card.service';
import { DateService } from './services/date.service';

@Injectable()
export class CourseService {
	constructor(
			@InjectRepository(CourseEntity) private readonly courseRepository: Repository<CourseEntity>,
			private readonly cardService: CardService,
			private readonly dateService: DateService,
			private readonly sectionDataService: SectionDataService,
			private readonly statusService: StatusService,
			private readonly tableService: TableService,
	){}

	public async create(createCourseDto: CreateCourseDto): Promise<CourseEntity>{
		const course = new CourseEntity();

		course.tab = createCourseDto.tab;
		course.name = createCourseDto.name;
		course.price = await this.statusService.create(createCourseDto.price);
		course.internationalPrice = await this.statusService.create(createCourseDto.internationalPrice);
		course.description = createCourseDto.description;
		course.lang = createCourseDto.lang;
		course.createdBy = createCourseDto.createdBy;
		course.date = await this.dateService.create(createCourseDto.date);
		course.duration = await this.statusService.create(createCourseDto.duration);
		course.card = await this.cardService.createAll(createCourseDto.card);
		course.courseSections = await this.sectionDataService.createAll(createCourseDto.courseSections);
		course.tables = await this.tableService.createAll(createCourseDto.tables);

		const createdCourse = this.courseRepository.create(course);

		return await this.courseRepository.save(createdCourse);
}

	public async getById(courseId: string): Promise<CourseEntity | null> {
		return await this.courseRepository.findOne({
			where: { id: courseId },
			relations: ["price", "internationalPrice", "date", "duration", "card", "courseSections" , "courseSections.content", "tables", "tables.rows", "tables.footer"],
		});
	}

	public async delete(courseId: string): Promise<void> {
		await this.courseRepository.delete(courseId);
	}

	public async update(courseId: string, updateCourseDto: UpdateCourseDto): Promise<CourseEntity> {
		const existingRoute = await this.courseRepository.find({
		  where: { id: courseId },
		  relations: ["price", "internationalPrice", "date", "duration", "card", "courseSections", "courseSections.content", "tables", "tables.rows", "tables.footer"],
		});
	
		if (!existingRoute) {
		  throw new NotFoundException(`Route with ID ${courseId} not found`);
		}

		Object.assign(existingRoute, updateCourseDto);
		//@ts-ignore
		return this.courseRepository.save(existingRoute);
	  }

	public async getAll(): Promise<CourseEntity[]> {
		return await this.courseRepository.find({
			relations: ["price", "internationalPrice", "date", "duration", "card", "courseSections", "courseSections.content", "tables", "tables.rows", "tables.rows", "tables.footer"],
		});
	}
}
