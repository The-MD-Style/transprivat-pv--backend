import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/Entity/base.entity";

@Entity('StatusEntity')
export class StatusEntity extends BaseEntity{

    @Column({type: 'int', nullable: true})
    default: number;

    @Column({type: 'int', nullable: true})
	recycle: number;
    
}

