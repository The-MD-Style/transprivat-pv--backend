import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/Entity/base.entity";
import { TableEntity } from "./table.entity";

@Entity('TableRowEntity')
export class TableRowEntity extends BaseEntity{

    @ManyToOne(() => TableEntity ,(tableEntity) => tableEntity.rows, {onDelete: 'CASCADE'})
    tableEntity: TableEntity;

    @Column({type: 'varchar', length:1000, array:true})
	row: string[];
    
}