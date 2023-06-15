import { BaseEntity } from "src/Entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity('DateEntity')
export class DateEntity extends BaseEntity{

    @Column({type: 'int'})
    day: number;

    @Column({type: 'int'})
	month: number;

    @Column({type: 'int'})
    year: number;
    
}