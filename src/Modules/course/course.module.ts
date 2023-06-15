import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionDataService } from './services/sectionData.service';
import { SectionDataEntity } from './entity/sectionData.entity';
import { TableRowService } from './services/tableRow.service';
import { ContentService } from './services/content.service';
import { TableRowEntity } from './entity/tableRow.entity';
import { StatusService } from './services/status.service';
import { ContentEntity } from './entity/content.entity';
import { TableService } from './services/table.service';
import { CourseController } from './course.controller';
import { StatusEntity } from './entity/status.entity';
import { CourseEntity } from './entity/course.entity';
import { CardService } from './services/card.service';
import { DateService } from './services/date.service';
import { TableEntity } from './entity/table.entity';
import { DateEntity } from './entity/date.entity';
import { CardEntity } from './entity/card.entity';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CardService, ContentService, DateService , SectionDataService, StatusService, TableService, TableRowService],
  exports: [CourseService, CardService, ContentService, DateService, SectionDataService,  StatusService, TableService, TableRowService],
  imports:[TypeOrmModule.forFeature([
    CourseEntity,
    CardEntity,
    ContentEntity,
    DateEntity,
    SectionDataEntity,
    StatusEntity,
    TableEntity,
    TableRowEntity
  ])]
})

export class CourseModule {}
