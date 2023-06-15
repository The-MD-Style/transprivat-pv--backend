import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/Entity/base.entity";
import { CourseEntity } from "./course.entity";

@Entity('CardEntity')
export class CardEntity extends BaseEntity{

    @ManyToOne( () => CourseEntity, (course) => course.card , {onDelete: 'CASCADE'})
    course:CourseEntity;

    @Column({ type: 'varchar', length:1000, nullable:true })
    title: string;

    @Column({ type: 'varchar', length:1000, array:true, nullable:true})
	requirements: string[];
    
}