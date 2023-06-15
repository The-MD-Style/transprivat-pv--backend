import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/Entity/base.entity";

@Entity('UploadFileEntity')
export class UploadFileEntity extends BaseEntity{

    @Column({ type: 'varchar', length:1000 })
    name: string;
    
}