import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { SectionDataEntity } from "./sectionData.entity";
import { StatusEntity } from "./status.entity";
import { TableEntity } from "./table.entity";
import { DateEntity } from "./date.entity";
import { CardEntity } from "./card.entity";
import { BaseEntity } from "src/Entity/base.entity";


@Entity('CourseEntity')
export class CourseEntity extends BaseEntity{

    @Column({ type: 'varchar', length: 250 })
    tab: string;

    @Column({ type: 'varchar', length: 250 })
    name: string;

    @OneToOne(() => StatusEntity, { cascade: true })
    @JoinColumn({name:"price_id"})
    price: StatusEntity;

    @OneToOne(() => StatusEntity, {nullable:true, cascade: true })
    @JoinColumn({name:"internationalPrice_id"})
    internationalPrice: StatusEntity;

    @Column({ type: 'varchar',length: 1000 , array:true })
    description: string[];

    @Column({ type: 'varchar',length: 250 , array:true })
    lang: string[];

    @Column({ type: 'varchar', length: 100 })
    createdBy: string;

    @OneToOne(() => DateEntity, { cascade: true })
    @JoinColumn({name:"date_id"})
    date: DateEntity;

    @OneToOne(() => StatusEntity, { cascade: true })
    @JoinColumn({name:"duration_id"})
    duration: StatusEntity;

    @OneToMany(() => CardEntity, (card) => card.course, { cascade:true })
    card: CardEntity[];

    @OneToMany(()=>SectionDataEntity, (courseSection) => courseSection.course, { cascade:true })
    courseSections: SectionDataEntity[];

    @OneToMany(()=>TableEntity, (table) => table.course, { cascade:true })
    tables: TableEntity[];
    
}