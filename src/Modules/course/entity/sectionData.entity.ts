import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { ContentEntity } from "./content.entity";
import { CourseEntity } from "./course.entity";
import { BaseEntity } from "src/Entity/base.entity";

@Entity('SectionDataEntity')
export class SectionDataEntity extends BaseEntity{

    @ManyToOne(() => CourseEntity, (course) => course.courseSections , {onDelete: 'CASCADE'})
	course: CourseEntity;

    @Column({type: 'varchar', length:1000})
    title: string;

    @OneToMany(() => ContentEntity, (content) => content.sectionData, { cascade:true })
	content: ContentEntity[];
    
}