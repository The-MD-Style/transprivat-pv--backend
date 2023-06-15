import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import { StatusEntity } from "./status.entity";
import { CourseEntity } from "./course.entity";
import { BaseEntity } from "src/Entity/base.entity";
import { TableRowEntity } from "./tableRow.entity";

@Entity('TableEntity')
export class TableEntity extends BaseEntity {

    @ManyToOne(() => CourseEntity, (course) => course.tables, {onDelete: 'CASCADE'})
    course:CourseEntity;

    @Column({type: 'varchar', length:1000})
    title: string;

    @Column({type: 'varchar', length:1000, array:true, nullable: true})
    head?: string[];


    @OneToMany(() => TableRowEntity, (rows) => rows.tableEntity ,{ cascade:true })
	rows: TableRowEntity[];

    @OneToOne(() => StatusEntity, { cascade:true })
    @JoinColumn({name:'footer_id'})
	footer: StatusEntity;
    
}